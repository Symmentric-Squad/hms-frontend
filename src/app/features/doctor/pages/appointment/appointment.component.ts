import { Component, computed, inject, signal } from '@angular/core';
import { RowActionEvent } from '../../../../shared/models/data-table.models';
import { FormField, ModalConfig, ModalSubmitEvent } from '../../../../shared/models/form.models';
import { AppointmentResponse, PatientResponse } from '../../models/doctor.model';
import { DoctorService } from '../../service/doctor.service';

import { formatDate } from '@angular/common';
import { TitleCasePipe } from '../../../../shared/pipe/custom-title-case.pipe';
import { buildAppointmentFields, patientAppointmentActions, patientAppointmentColumns } from './appointment.config';

@Component({
  selector: 'app-appointment-history',
  standalone: false,
  templateUrl: './appointment.component.html',
  styleUrl: '../../../../../styles.css',
})
export class DoctorAppointmentsPage {

  private readonly doctorService = inject(DoctorService);
  private readonly titleCasePipe = inject(TitleCasePipe);

  appointments = signal<AppointmentResponse[]>([]);
  patients = signal<PatientResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  doctorId :number = 0; 

  appointmentColumns = patientAppointmentColumns;
  appointmentActions = patientAppointmentActions;

  
  patientFieldOptions = computed(() =>
    this.patients().map((patientObj) => ({
      label: this.titleCasePipe.transform(patientObj.patientName),
      value: patientObj.patientName,
    }))
  );

  // ── Modal state ────────────────────────────────────────────────────────────

  isModalOpen = false;
  modalConfig: ModalConfig = this.createConfig();
  modalFields: FormField[] = [];

  private editingId: number | null = null;


  ngOnInit(): void {
    this.doctorId = Number(localStorage.getItem('userId'));
    if (!this.doctorId || this.doctorId === 0) {
      this.error.set('Invalid User ID');
      return;
    }
    this.loadAppointments(this.doctorId);
    this.loadPatients();
  }

  // ── Load 

  loadPatients(): void {
    this.loading.set(true);
    this.error.set(null);
    this.doctorService.getMyPatients(this.doctorId).subscribe({
      next: (data) => { this.patients.set(data);console.log(data); this.loading.set(false); },
      error: () => { this.error.set('Failed to Load Patients'); this.loading.set(false); },
    });
  }

  loadAppointments(doctorId: number): void {
  this.loading.set(true);
  this.error.set(null);

  this.doctorService.getAppointments(doctorId).subscribe({
    next: (data: AppointmentResponse[]) => {
      const now = new Date();

      const formattedData = data.map(apt => {
        // 1. Combine date and time strings to check if it's in the past
        // Assumes format: 'YYYY-MM-DD' and 'HH:mm'
        const appointmentDateTime = new Date(`${apt.appointmentDate}T${apt.appointmentTime}`);
        
        // 2. Determine the status based on the time
        const status = appointmentDateTime < now ? 'Completed' : apt.currentStatus;

        // 3. Return the newly transformed object
        return {
          ...apt,
          creationDate: formatDate(apt.creationDate, 'dd-MM-yyyy - HH:mm', 'en-US'),
          currentStatus: status
        };
      });

      this.appointments.set(formattedData);
      console.log(formattedData);
      this.loading.set(false);
    },
    error: () => {
      this.error.set('Failed to Load Appointments');
      this.loading.set(false);
    },
  });
}

  // ── Status check helper ────────────────────────────────────────────────────
  isAppointmentActive(appointment: AppointmentResponse): boolean {
    return appointment.currentStatus === 'Active';
  }

  // ── Cancel
  cancelAppointment(appointmentId: number): void {
    if (!confirm('Cancel this appointment?')) return;

    this.doctorService.cancelAppointment(appointmentId).subscribe({
      next: () => this.loadAppointments(this.doctorId),
      error: () => this.error.set('Failed to Cancel Appointment'),
    });
  }

  // ── Status badge styling ───────────────────────────────────────────────────
  getStatusBadgeClass(status: string): string {
    const baseClass = 'inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap';
    
    switch (status) {
      case 'Active':
        return `${baseClass} bg-blue-100 text-blue-800`;
      case 'Cancel by Doctor':
        return `${baseClass} bg-red-100 text-red-900`;
      case 'Cancel by User':
        return `${baseClass} bg-red-100 text-red-900`;
      case 'Completed':
        return `${baseClass} bg-green-100 text-green-900`;
      default:
        return `${baseClass} bg-gray-100 text-gray-800`;
    }
  }

  // ── Modal handlers ─────────────────────────────────────────────────────────
  
  handleOpenCreate(): void {
    this.editingId = null;
    this.modalConfig = this.createConfig();
    this.modalFields = buildAppointmentFields(this.patientFieldOptions());
    this.isModalOpen = true;
  }

  handleOpenEdit(appointment: AppointmentResponse): void {
    // this.editingId = appointment.id;
    // this.modalConfig = this.editConfig();
    // this.modalFields = buildAppointmentFields(this.patientFieldOptions(), this.doctorFieldOptions(), appointment);
    // this.isModalOpen = true;
  }

  handleSubmit(event: ModalSubmitEvent): void {
    // const formData = event.formData as AppointmentRequest;

    // if (this.editingId === null) {
    //   // CREATE — delegate to API
    //   this.bookAppointment(formData);
    // } else {
    //   // EDIT — TODO: wire up your update API call here
    //   this.appointments.update(current =>
    //     current.map(a => a.id === this.editingId ? { ...a, ...formData } : a)
    //   );
    //   this.closeModal();
    // }
  }

  handleDelete(id: number): void {
    // this.appointments.update(current => current.filter(a => a.id !== id));
  }

  handleCancel(): void {
    this.closeModal();
  }

  handleBackdropClick(): void {
    this.closeModal();
  }

  // ── Row action dispatcher ──────────────────────────────────────────────────

  onTableAction(event: RowActionEvent): void {
    const { action, rowData } = event;
    if (action === 'edit') this.handleOpenEdit(rowData as AppointmentResponse);
    if (action === 'delete') this.handleDelete(rowData.id);
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  private closeModal(): void {
    this.isModalOpen = false;
    this.editingId = null;
  }

  private createConfig(): ModalConfig {
    return {
      title: 'Book Appointment',
      submitButtonText: 'Book Appointment',
      cancelButtonText: 'Cancel',
      size: 'medium',
      mode: 'create',
    };
  }

  private editConfig(): ModalConfig {
    return {
      title: 'Edit Appointment',
      submitButtonText: 'Save Changes',
      cancelButtonText: 'Cancel',
      size: 'medium',
      mode: 'edit',
    };
  }
}