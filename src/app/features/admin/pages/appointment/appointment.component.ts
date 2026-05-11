import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { PublicService } from '../../../../core/services/public.service';
import { doctors, patients } from '../../../../shared/db/db';
import { RowActionEvent } from '../../../../shared/models/data-table.models';
import { ModalSubmitEvent } from '../../../../shared/models/form.models';
import { AppointmentRequest, AppointmentResponse } from '../../models/admin.model';
import { AdminService } from '../../service/admin.service';
import { appointmentActions, appointmentColumns, appointmentModalConfig, appointmentModalFields } from './appointment.config';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-appointment-history',
  standalone: false,
  templateUrl: './appointment.component.html',
  styleUrl: '../../../../../styles.css',
})
export class AdminAppointmentsPage {

  private readonly appointmentService = inject(PublicService);
  private readonly adminAppointmentService = inject(AdminService);
  private readonly auth = inject(AuthService);

  appointments = signal<AppointmentResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  doctors = doctors;
  patients = patients;

  appointmentColumns = appointmentColumns;
  appointmentActions = appointmentActions;
  appointmentModalConfig = appointmentModalConfig;
  appointmentModalFields = appointmentModalFields;

  ngOnInit(): void {
    this.loadAppointments();
  }

  // ── Load 
  loadAppointments(userId: number = 1): void {
    this.loading.set(true);
    this.error.set(null);

    this.adminAppointmentService.getAllAppointments().subscribe({
      next: (data) => {
        this.appointments.set(data);
        console.log(data)
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

    this.appointmentService.bookAppointment(request).subscribe({
      next: (newAppointment) => {
        this.appointments.update((prev) => [...prev, newAppointment]);
        this.loading.set(false);
        this.showAppointmentModal = false;
      },
      error: () => {
        this.error.set('Failed to Book Appointment');
        this.loading.set(false);
      },
    });
  }

  // ── Cancel ────────────────────────────────────────────────────────────────
  cancelAppointment(appointmentId: number): void {
  if (!confirm('Cancel this appointment?')) return;

  this.appointmentService.cancelAppointment(appointmentId).subscribe({
    next: () => this.loadAppointments(), // 👈 just refetch, no type juggling
    error: () => this.error.set('Failed to Cancel Appointment'),
  });
}

  // ── Modal state ───────────────────────────────────────────────────────────
  showAppointmentModal = false;
  editingAppointment: Partial<AppointmentRequest> = {};

  openAddAppointment(): void {
    this.editingAppointment = {};
    this.showAppointmentModal = true;
  }

  onSubmit(event: ModalSubmitEvent): void {
    if (!event.isValid) {
      alert('Please fill in all required fields.');
      return;
    }
    this.bookAppointment(event.formData as AppointmentRequest);
  }

  // ── Row actions ───────────────────────────────────────────────────────────
  onAppointmentTableAction(event: RowActionEvent): void {
    const { action, rowData } = event;
    console.log(rowData)
    if (action === 'edit') {
      this.editingAppointment = { ...rowData };
      this.showAppointmentModal = true;
    } else if (action === 'cancel') {
      this.cancelAppointment(rowData.appointmentId);
    }
  }
}