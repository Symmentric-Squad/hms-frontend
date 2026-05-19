import { Component, computed, inject, signal } from '@angular/core';
import { RowActionEvent } from '../../../../shared/models/data-table.models';
import { FormField, ModalConfig, ModalSubmitEvent } from '../../../../shared/models/form.models';
import { TitleCasePipe } from '../../../../shared/pipe/custom-title-case.pipe';
import { AppointmentRequest, AppointmentResponse, DoctorResponse, PatientResponse } from '../../models/admin.model';
import { AdminService } from '../../service/admin.service';
import {
  appointmentActions,
  appointmentColumns,
  buildCreateAppointmentFields,
  buildEditAppointmentFields,
  createAppointmentModalConfig,
  editAppointmentModalConfig,
} from './appointment.config';
import { resetFakeAsyncZone } from '@angular/core/testing';


@Component({
  selector: 'app-appointment-history',
  standalone: false,
  templateUrl: './appointment.component.html',
  styleUrl: '../../../../../styles.css',
})
export class AdminAppointmentsPage {

  private readonly adminService = inject(AdminService);
  private readonly titleCasePipe = inject(TitleCasePipe);

  // ────────────────────────────────────────────────────────────────────────────
  // SIGNALS & STATE
  // ────────────────────────────────────────────────────────────────────────────

  appointments = signal<AppointmentResponse[]>([]);
  doctors = signal<DoctorResponse[]>([]);
  patients = signal<PatientResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // Modal state
  isModalOpen = false;
  modalConfig: ModalConfig = createAppointmentModalConfig;
  modalFields: FormField[] = [];
  private editingId: number | null = null;

  // Table configuration
  appointmentColumns = appointmentColumns;
  appointmentActions = appointmentActions;

  // ────────────────────────────────────────────────────────────────────────────
  // COMPUTED VALUES
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * Convert doctor responses to field options for select dropdown
   * Stores ID as value for backend compatibility
   */
  doctorFieldOptions = computed(() => {
    console.log('🔄 Computing doctor options with:', this.doctors());
    return this.doctors().map((docObj) => ({
      label: this.titleCasePipe.transform(docObj.doctorName),
      value: docObj.id,
    }));
  });

  /**
   * Convert patient responses to field options for select dropdown
   * Stores patient ID/name as value for backend compatibility
   */
  patientFieldOptions = computed(() => {
    console.log('🔄 Computing patient options with:', this.patients());
    return this.patients().map((patientObj) => ({
      label: this.titleCasePipe.transform(patientObj.patientName),
      value: patientObj.patientId,  // Adjust based on what your API expects
    }));
  });

  // ────────────────────────────────────────────────────────────────────────────
  // LIFECYCLE
  // ────────────────────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.loadAppointments();
    this.loadDoctors();
    this.loadPatients();
  }

  // ────────────────────────────────────────────────────────────────────────────
  // DATA LOADING
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * Load all doctors from API
   */
  loadDoctors(): void {
    console.log('📥 Loading doctors...');
    this.loading.set(true);
    this.error.set(null);

    this.adminService.getAllDoctors().subscribe({
      next: (data) => {
        console.log('✅ Doctors loaded successfully:', data);
        this.doctors.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('❌ Failed to load doctors:', err);
        this.error.set('Failed to Load Doctors');
        this.loading.set(false);
      },
    });
  }

  /**
   * Load all patients from API
   */
  loadPatients(): void {
    console.log('📥 Loading patients...');
    this.loading.set(true);
    this.error.set(null);

    this.adminService.getAllPatients().subscribe({
      next: (data) => {
        console.log('✅ Patients loaded successfully:', data);
        this.patients.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('❌ Failed to load patients:', err);
        this.error.set('Failed to Load Patients');
        this.loading.set(false);
      },
    });
  }

  /**
   * Load all appointments from API
   */
  loadAppointments(): void {
    console.log('📥 Loading appointments...');
    this.loading.set(true);
    this.error.set(null);

    this.adminService.getAllAppointments().subscribe({
      next: (data) => {
        console.log('✅ Appointments loaded successfully:', data);
        this.appointments.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('❌ Failed to load appointments:', err);
        this.error.set('Failed to Load Appointments');
        this.loading.set(false);
      },
    });
  }

  // ────────────────────────────────────────────────────────────────────────────
  // MODAL HANDLERS
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * Open modal in CREATE mode
   * - Uses createAppointmentModalConfig
   * - Builds empty form fields for new appointment entry
   */
  handleOpenCreate(): void {
    console.log('🔓 Opening Create Modal for new appointment');
    this.editingId = null;
    this.modalConfig = createAppointmentModalConfig;
    this.modalFields = buildCreateAppointmentFields(
      this.patientFieldOptions(),
      this.doctorFieldOptions()
    );
    this.isModalOpen = true;
  }

  /**
   * Open modal in EDIT mode
   * - Uses editAppointmentModalConfig
   * - Builds form fields pre-populated with existing appointment data
   * - Finds doctor and patient IDs from their respective arrays
   */
  handleOpenEdit(appointment: AppointmentResponse): void {
    console.log('🔓 Opening Edit Modal for appointment ID:', appointment.appointmentId, 'Appointment data:', appointment);

    // Find doctor ID from doctors array
    const doctor = this.doctors().find(d => d.doctorName === appointment.doctorName);
    const doctorId = doctor?.id;

    // Find patient ID/info from patients array
    const patient = this.patients().find(p => p.patientName === appointment.patientName);
    const patientId = patient?.patientName;  // Adjust based on what your API expects

    console.log('🔍 Found doctor ID:', doctorId, 'and patient ID:', patientId);

    this.editingId = appointment.appointmentId;
    this.modalConfig = editAppointmentModalConfig;
    this.modalFields = buildEditAppointmentFields(
      this.patientFieldOptions(),
      this.doctorFieldOptions(),
      appointment,
      doctorId,
      patient?.patientId
    );
    this.isModalOpen = true;
  }

  /**
   * Handle form submission from modal
   * - Validates if this is a create or edit operation based on editingId
   * - Routes to appropriate service method
   */
  handleSubmit(event: ModalSubmitEvent): void {
    console.log('📤 Form Submit Handler Called');
    console.log('📋 Submit Event Data:', event);
    console.log('📋 Form Data:', event.formData);
    console.log('✔️ Is Valid:', event.isValid);

    const formData = event.formData;

    // Transform form data to AppointmentRequest with proper type conversions
    const appointmentRequest = this.transformToAppointmentRequest(formData);

    if (this.editingId === null) {
      // CREATE operation
      console.log('➕ Creating new appointment with data:', appointmentRequest);
      this.createAppointment(appointmentRequest);
    } else {
      // UPDATE operation
      console.log('✏️ Updating appointment ID:', this.editingId, 'with data:', appointmentRequest);
      this.updateAppointment(this.editingId, appointmentRequest);
    }

    this.closeModal();
  }

  /**
   * Handle modal cancellation
   */
  handleCancel(): void {
    console.log('❌ Modal cancelled');
    this.closeModal();
  }

  /**
   * Handle backdrop click
   */
  handleBackdropClick(): void {
    console.log('❌ Backdrop clicked - closing modal');
    this.closeModal();
  }

  // ────────────────────────────────────────────────────────────────────────────
  // CRUD OPERATIONS
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * CREATE: Book a new appointment
   * - Calls AdminService.createAppointment() with AppointmentRequest
   */
  createAppointment(request: AppointmentRequest): void {
    request.consultancyFees = 500;
    console.log('🚀 createAppointment() called with request:', request);
    this.loading.set(true);

    this.adminService.createAppointment(request).subscribe({
      next: (newAppointment) => {
        console.log('✅ Appointment created successfully:', newAppointment);
        this.appointments.update((prev) => {
          console.log('📊 Previous appointments count:', prev.length);
          const updated = [...prev, newAppointment];
          console.log('📊 Updated appointments list:', updated);
          return updated;
        });
        this.loading.set(false);
        this.error.set(null);
      },
      error: (err) => {
        console.error('❌ Failed to create appointment:', err);
        this.error.set('Failed to Book Appointment');
        this.loading.set(false);
      },
    });
  }

  /**
   * UPDATE: Edit an existing appointment
   * - Note: Backend may not have a dedicated update endpoint
   * - Check if AdminService has updateAppointment() method
   * - If not, this method can be extended or use alternative approach
   */
  updateAppointment(id: number, request: AppointmentRequest): void {
    // console.log('🚀 updateAppointment() called with ID:', id, 'Request:', request);
    // this.loading.set(true);

    // // Check if updateAppointment exists in AdminService
    // if ((this.adminService as any).updateAppointment) {
    //   (this.adminService as any).updateAppointment(id, request).subscribe({
    //     next: (updated: AppointmentResponse) => {
    //       console.log('✅ Appointment updated successfully:', updated);
    //       this.appointments.update((prev) => {
    //         console.log('📊 Previous appointments count:', prev.length);
    //         const updatedList = prev.map((a) => {
    //           if (a.appointmentId === id) {
    //             console.log('🔄 Replacing appointment ID:', id, 'with updated data');
    //             return updated;
    //           }
    //           return a;
    //         });
    //         console.log('📊 Updated appointments list:', updatedList);
    //         return updatedList;
    //       });
    //       this.loading.set(false);
    //       this.error.set(null);
    //     },
    //     error: (err:any) => {
    //       console.error('❌ Failed to update appointment:', err);
    //       this.error.set('Failed to Update Appointment');
    //       this.loading.set(false);
    //     },
    //   });
    // } else {
    //   console.warn('⚠️ updateAppointment() not available in AdminService');
    //   this.error.set('Update functionality not yet available');
    //   this.loading.set(false);
    // }
  }

  /**
   * DELETE: Remove an appointment
   * - Calls AdminService.deleteAppointment() when available
   * - Removes appointment from local list
   */
  handleDelete(id: number): void {
    // console.log('🗑️ Deleting appointment ID:', id);
    // this.loading.set(true);

    // // Check if deleteAppointment exists in AdminService
    // if (this.adminService.deleteAppointment) {
    //   this.adminService.deleteAppointment(id).subscribe({
    //     next: () => {
    //       console.log('✅ Appointment deleted successfully');
    //       this.appointments.update((currentAppointments) => {
    //         const filtered = currentAppointments.filter((apt) => apt.appointmentId !== id);
    //         console.log('📊 Updated appointments list after deletion:', filtered);
    //         return filtered;
    //       });
    //       this.loading.set(false);
    //       this.error.set(null);
    //     },
    //     error: (err:any) => {
    //       console.error('❌ Failed to delete appointment:', err);
    //       this.error.set('Failed to Delete Appointment');
    //       this.loading.set(false);
    //     },
    //   });
    // } else {
    //   console.warn('⚠️ deleteAppointment() not available in AdminService');
    //   this.error.set('Delete functionality not yet available');
    //   this.loading.set(false);
    // }
  }

  // ────────────────────────────────────────────────────────────────────────────
  // TABLE ACTIONS
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * Handle table action events
   * - Routes edit action to handleOpenEdit()
   * - Routes delete action to handleDelete()
   */
  onTableAction(event: RowActionEvent): void {
    console.log('📍 Table action triggered:', event);
    const { action, rowData } = event;
    console.log('🎯 Action:', action, 'Row Data:', rowData);

    if (action === 'edit') {
      this.handleOpenEdit(rowData as AppointmentResponse);
    }
    if (action === 'delete') {
      this.handleDelete(rowData.appointmentId);
    }
  }

  // ────────────────────────────────────────────────────────────────────────────
  // HELPER METHODS
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * Transform form data to AppointmentRequest
   * - Ensures proper type conversions for numbers
   * - Maps user-friendly field values to API-expected field names
   */
  private transformToAppointmentRequest(data: any): AppointmentRequest {
    return {
      userId: Number(data.userId) || 0,
      doctorId: Number(data.doctorId),
      consultancyFees: Number(data.consultancyFees),
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
    };
  }

  /**
   * Close modal and reset state
   */
  private closeModal(): void {
    console.log('🔒 Closing modal');
    this.isModalOpen = false;
    this.editingId = null;
  }
}