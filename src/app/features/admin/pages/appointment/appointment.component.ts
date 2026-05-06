import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { PublicService } from '../../../../core/services/public.service';
import { doctors, patients } from '../../../../shared/db/db';
import { RowActionEvent, TableAction, TableColumn } from '../../../../shared/models/data-table.models';
import { FormField, ModalConfig, ModalSubmitEvent } from '../../../../shared/models/form.models';
import { AppointmentRequest, AppointmentResponse } from '../../models/admin.model';


@Component({
  selector: 'app-appointment-history',
  standalone: false,
  templateUrl: './appointment.component.html',
  styleUrl: '../../../../../styles.css',
})
export class AdminAppointmentsPage {

  private readonly appointmentService = inject(PublicService);
  private readonly auth = inject(AuthService);

  appointments = signal<AppointmentResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  doctors = doctors;
  patients = patients;

  ngOnInit(): void {
    this.loadAppointments();
  }

  // ── Load ──────────────────────────────────────────────────────────────────
  loadAppointments(userId: number = 1): void {
    this.loading.set(true);
    this.error.set(null);

    this.appointmentService.getMyAppointments(userId).subscribe({
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

  // ── Book ──────────────────────────────────────────────────────────────────
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

  // ── Table config ──────────────────────────────────────────────────────────
  appointmentColumns: TableColumn[] = [
    { key: "patientName", label: "Patient Name"},
    { key: "doctorName", label: "Doctor Name"},
    // { key: "specialization", label: "Specialization"},
    // { key: "consultancyFees", label: "Consultancy Fees"},
    { key: "appointmentDate", label: "Appointment Date"},
    { key: "appointmentTime", label: "Appointment Time"},
    // { key: "creationDate", label: "Creation Date"},
    { 
      key: "currentStatus",
      label: "Current Status",
      type: 'badge',
      tagColors: {
        Active: { bg: '#dbeafe', text: '#1e40af' },
        Completed: { bg: '#d1fae5', text: '#065f46' },
        Cancelled:  { bg: '#fee2e2', text: '#991b1b' },
      }
    }
  ];

  appointmentActions: TableAction[] = [
    { id: 'view',   label: 'View',   icon: 'eye.svg',   type: 'secondary', actionColor: 'gray' },
    { id: 'edit',   label: 'Edit',   icon: 'edit.svg',  type: 'primary',   actionColor: 'blue' },
    { id: 'delete', label: 'Delete', icon: 'trash.svg', type: 'danger',    actionColor: 'red'  },
  ];

  appointmentModalConfig: ModalConfig = {
    title: 'Add Appointment',
    submitButtonText: 'Save Details',
    cancelButtonText: 'Cancel',
    size: 'medium',
    mode: 'create',
  };

  appointmentModalFields: FormField[] = [
    { key: 'patientName', label: 'Patient Name',      type: 'text',   required: true },
    { key: 'doctor',      label: 'Doctor Name',        type: 'text',   required: true },
    { key: 'date',        label: 'Appointment Date',   type: 'date',   required: true },
    { key: 'time',        label: 'Appointment Time',   type: 'time',   required: true },
    {
      key: 'status', label: 'Status', type: 'select', required: true,
      options: [
        { label: 'Scheduled', value: 'Scheduled' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Cancelled', value: 'Cancelled' },
      ],
    },
  ];

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
    if (action === 'edit') {
      this.editingAppointment = { ...rowData };
      this.showAppointmentModal = true;
    } else if (action === 'delete') {
      this.cancelAppointment(rowData.id);
    }
  }
}