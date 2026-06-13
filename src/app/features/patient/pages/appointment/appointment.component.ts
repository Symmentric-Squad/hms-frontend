import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { PublicService } from '../../../../core/services/public.service';
import { RowActionEvent, TableAction, TableColumn } from '../../../../shared/models/data-table.models';
import { FormField, ModalConfig, ModalSubmitEvent } from '../../../../shared/models/form.models';
import { AppointmentRequest, AppointmentResponse, DoctorResponse } from '../../../../core/models/public.model';
import { TitleCasePipe } from '../../../../shared/pipe/custom-title-case.pipe';
import { appointmentActions, appointmentColumns, buildAppointmentFields } from './appointment.config';


@Component({
  selector: 'app-appointment-history',
  standalone: false,
  templateUrl: './appointment.component.html',
  styleUrl: '../../../../../styles.css',
})
export class PatientAppointmentsPage {
  private readonly publicService = inject(PublicService);
  private readonly auth = inject(AuthService);
  private readonly titleCasePipe = inject(TitleCasePipe);

  appointments = signal<AppointmentResponse[]>([]);
  doctors = signal<DoctorResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  userId:number = 0;

  appointmentColumns = appointmentColumns;
  appointmentActions = appointmentActions;

  doctorFieldOptions = computed(() =>
    this.doctors().map((docObj) => ({
      label: this.titleCasePipe.transform(docObj.doctorName),
      value: docObj.id,
    }))
  );

  // ── Modal state ────────────────────────────────────────────────────────────

  isModalOpen = false;
  modalConfig: ModalConfig = this.createConfig();
  modalFields: FormField[] = [];

  private editingId: number | null = null;

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    if (!this.userId || this.userId === 0) {
      this.error.set('Invalid User ID');
      return;
    }

    this.loadAppointments(this.userId);

  }

  // ── Loaders ────────────────────────────────────────────────────────────────

  loadAppointments(userId: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.publicService.getMyAppointments(userId).subscribe({
      next: (data: AppointmentResponse[]) => {
        const now = new Date();

        // Map through the appointments to check and update the status
        const updatedAppointments = data.map(appointment => {
          // Combine date and time strings into a single Date object
          // Assumes format: 'YYYY-MM-DD' and 'HH:mm' or 'HH:mm:ss'
          const appointmentDateTime = new Date(`${appointment.appointmentDate}T${appointment.appointmentTime}`);
          console.log("appointment date time is ", appointmentDateTime)

          // If the appointment date/time is in the past, mark it as completed
          if (appointmentDateTime < now) {
            console.log("found an appointment which is over")
            return {
              ...appointment,
              currentStatus: 'Completed'
            };
          }

          // Keep the original appointment if it's in the future
          return appointment;
        });

        this.appointments.set(updatedAppointments);
        console.log(updatedAppointments);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to Load Appointments');
        this.loading.set(false);
      },
    });
  }

  // ── Book 
  bookAppointment(request: AppointmentRequest): void {
    this.loading.set(true);

    this.publicService.bookAppointment(request).subscribe({
      next: (newAppointment) => {
        this.appointments.update((prev) => [...prev, newAppointment]);
        this.loading.set(false);
        this.closeModal();
      },
      error: () => {
        this.error.set('Failed to Book Appointment');
        this.loading.set(false);
      },
    });
  }

  // ── Cancel
  cancelAppointment(appointmentId: number): void {
    if (!confirm('Cancel this appointment?')) return;

    console.log(appointmentId)

    this.publicService.cancelAppointment(appointmentId).subscribe({
      next: () => this.loadAppointments(this.userId),
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
      default:
        return `${baseClass} bg-gray-100 text-gray-800`;
    }
  }
  
  // ── Status check helper ────────────────────────────────────────────────────
  isAppointmentActive(appointment: AppointmentResponse): boolean {
    return appointment.currentStatus === 'Active';
  }

  // ── Modal handlers ─────────────────────────────────────────────────────────

  handleOpenCreate(): void {
    this.editingId = null;
    this.modalConfig = this.createConfig();
    this.modalFields = buildAppointmentFields(this.doctorFieldOptions());
    this.isModalOpen = true;
  }

  handleOpenEdit(appointment: AppointmentResponse): void {
    // this.editingId = appointment.id;
    // this.modalConfig = this.editConfig();
    // this.modalFields = buildAppointmentFields(this.doctorFieldOptions(), appointment);
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