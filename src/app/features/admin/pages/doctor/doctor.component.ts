import { Component, computed, inject, signal } from '@angular/core';
import { RowActionEvent } from '../../../../shared/models/data-table.models';
import { FormField, ModalConfig, ModalSubmitEvent } from '../../../../shared/models/form.models';
import { TitleCasePipe } from '../../../../shared/pipe/custom-title-case.pipe';
import { CreateDoctorRequest, DoctorResponse, SpecializationResponse, UpdateDoctorRequest } from '../../models/admin.model';
import { AdminService } from '../../service/admin.service';
import {
  buildCreateDoctorFields,
  buildEditDoctorFields,
  createDoctorModalConfig,
  editDoctorModalConfig,
  doctorActions,
  doctorColumns,
} from './doctor.config';


@Component({
  selector: 'app-admin-doctor',
  standalone: false,
  templateUrl: 'doctor.component.html',
  styleUrl: '../../../../../styles.css',
})
export class AdminDoctorsPage {
  private readonly adminService = inject(AdminService);
  private readonly titleCasePipe = inject(TitleCasePipe);

  // ────────────────────────────────────────────────────────────────────────────
  // SIGNALS & STATE
  // ────────────────────────────────────────────────────────────────────────────

  specializations = signal<SpecializationResponse[]>([]);
  doctors = signal<DoctorResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // Modal state
  isModalOpen = false;
  modalConfig: ModalConfig = createDoctorModalConfig;
  modalFields: FormField[] = [];
  private editingId: number | null = null;

  // Table configuration
  doctorColumns = doctorColumns;
  doctorActions = doctorActions;

  // ────────────────────────────────────────────────────────────────────────────
  // COMPUTED VALUES
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * Convert specialization responses to field options for select dropdown
   */
  specializationFieldOptions = computed(() => {
    console.log('🔄 Computing specialization options with:', this.specializations());

    return this.specializations().map((specObj) => ({
      label: this.titleCasePipe.transform(specObj.specialization),
      value: specObj.id,
    }));
  });

  // ────────────────────────────────────────────────────────────────────────────
  // LIFECYCLE
  // ────────────────────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.loadDoctors();
    this.loadSpecializations();
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
   * Load all specializations from API
   */
  loadSpecializations(): void {
    console.log('📥 Loading specializations...');
    this.loading.set(true);
    this.error.set(null);

    this.adminService.getAllSpecializations().subscribe({
      next: (data) => {
        console.log('✅ Specializations loaded successfully:', data);
        this.specializations.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('❌ Failed to load specializations:', err);
        this.error.set('Failed to Load Specializations');
        this.loading.set(false);
      },
    });
  }

  // ────────────────────────────────────────────────────────────────────────────
  // MODAL HANDLERS
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * Open modal in CREATE mode
   * - Uses createDoctorModalConfig
   * - Builds empty form fields for new doctor entry
   */
  handleOpenCreate(): void {
    console.log('🔓 Opening Create Modal');
    this.editingId = null;
    this.modalConfig = createDoctorModalConfig;
    this.modalFields = buildCreateDoctorFields(this.specializationFieldOptions());
    this.isModalOpen = true;
  }

  /**
   * Open modal in EDIT mode
   * - Uses editDoctorModalConfig
   * - Builds form fields pre-populated with existing doctor data
   */
  handleOpenEdit(doctor: DoctorResponse): void {
    console.log('🔓 Opening Edit Modal for doctor ID:', doctor.id, 'Doctor data:', doctor);
    this.editingId = doctor.id;
    this.modalConfig = editDoctorModalConfig;
    this.modalFields = buildEditDoctorFields(this.specializationFieldOptions(), doctor);
    // Fetch specialization ID from specializations array at modal open time
    const specializationId = this.specializations().find(
        s => s.specialization === doctor.specializationName
    )?.specialization;

    // Pass it to buildEditDoctorFields
    this.modalFields = buildEditDoctorFields(
        this.specializationFieldOptions(),
        doctor,
        specializationId || doctor.specializationName
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

    if (this.editingId === null) {
      // CREATE operation
      const createRequest = event.formData as CreateDoctorRequest;
      console.log('➕ Creating new doctor with data:', createRequest);
      this.addDoctor(createRequest);
    } else {
      // UPDATE operation
      const updateRequest = event.formData as UpdateDoctorRequest;
      console.log('✏️ Updating doctor ID:', this.editingId, 'with data:', updateRequest);
      this.editDoctor(this.editingId, updateRequest);
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
   * CREATE: Add a new doctor
   * - Calls AdminService.createDoctor() with CreateDoctorRequest
   * - Includes password field
   */
  addDoctor(request: CreateDoctorRequest): void {
    console.log('🚀 addDoctor() called with request:', request);
    this.loading.set(true);

    this.adminService.createDoctor(request).subscribe({
      next: (newDoctor) => {
        console.log('✅ Doctor created successfully:', newDoctor);
        this.doctors.update((prev) => {
          console.log('📊 Previous doctors count:', prev.length);
          const updated = [...prev, newDoctor];
          console.log('📊 Updated doctors list:', updated);
          return updated;
        });
        this.loading.set(false);
        this.error.set(null);
      },
      error: (err) => {
        console.error('❌ Failed to create doctor:', err);
        this.error.set('Failed to Add Doctor');
        this.loading.set(false);
      },
    });
  }

  /**
   * UPDATE: Edit an existing doctor
   * - Calls AdminService.updateDoctor() with UpdateDoctorRequest
   * - Does NOT include password field (use separate password change flow)
   */
  editDoctor(id: number, request: UpdateDoctorRequest): void {
    console.log('🚀 editDoctor() called with ID:', id, 'Request:', request);
    this.loading.set(true);

    this.adminService.updateDoctor(id, request).subscribe({
      next: (updated) => {
        console.log('✅ Doctor updated successfully:', updated);
        this.doctors.update((prev) => {
          console.log('📊 Previous doctors count:', prev.length);
          const updatedList = prev.map((d) => {
            if (d.id === id) {
              console.log('🔄 Replacing doctor ID:', id, 'with updated data');
              return updated;
            }
            return d;
          });
          console.log('📊 Updated doctors list:', updatedList);
          return updatedList;
        });
        this.loading.set(false);
        this.error.set(null);
      },
      error: (err) => {
        console.error('❌ Failed to update doctor:', err);
        this.error.set('Failed to Update Doctor');
        this.loading.set(false);
      },
    });
  }

  /**
   * DELETE: Remove a doctor
   * - Calls AdminService.deleteDoctor() when service is ready
   * - Currently commented out pending backend implementation
   */
  // handleDelete(id: number): void {
  //   console.log('🗑️ Deleting doctor ID:', id);
  //   this.loading.set(true);
  //
  //   this.adminService.deleteDoctor(id).subscribe({
  //     next: () => {
  //       console.log('✅ Doctor deleted successfully');
  //       this.doctors.update((currentDoctors) => {
  //         const filtered = currentDoctors.filter((doc) => doc.id !== id);
  //         console.log('📊 Updated doctors list after deletion:', filtered);
  //         return filtered;
  //       });
  //       this.loading.set(false);
  //       this.error.set(null);
  //     },
  //     error: (err) => {
  //       console.error('❌ Failed to delete doctor:', err);
  //       this.error.set('Failed to Delete Doctor');
  //       this.loading.set(false);
  //     },
  //   });
  // }

  // ────────────────────────────────────────────────────────────────────────────
  // TABLE ACTIONS
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * Handle table action events
   * - Routes edit action to handleOpenEdit()
   * - Ready for view and delete actions when needed
   */
  onTableAction(event: RowActionEvent): void {
    console.log('📍 Table action triggered:', event);
    const { action, rowData } = event;
    console.log('🎯 Action:', action, 'Row Data:', rowData);

    if (action === 'edit') {
      this.handleOpenEdit(rowData);
    }
    // Add these when ready:
    // if (action === 'view') this.handleViewDoctor(rowData);
    // if (action === 'delete') this.handleDelete(rowData.id);
  }

  // ────────────────────────────────────────────────────────────────────────────
  // HELPER METHODS
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * Close modal and reset state
   */
  private closeModal(): void {
    console.log('🔒 Closing modal');
    this.isModalOpen = false;
    this.editingId = null;
  }
}