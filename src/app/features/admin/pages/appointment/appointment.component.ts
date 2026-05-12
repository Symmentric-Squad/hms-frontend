import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { PublicService } from '../../../../core/services/public.service';
import { RowActionEvent } from '../../../../shared/models/data-table.models';
import { FormField, ModalConfig, ModalSubmitEvent } from '../../../../shared/models/form.models';
import { TitleCasePipe } from '../../../../shared/pipe/custom-title-case.pipe';
import { AppointmentRequest, AppointmentResponse, DoctorResponse, PatientResponse } from '../../models/admin.model';
import { AdminService } from '../../service/admin.service';
import { appointmentActions, appointmentColumns, buildAppointmentFields } from './appointment.config';


@Component({
  selector: 'app-appointment-history',
  standalone: false,
  templateUrl: './appointment.component.html',
  styleUrl: '../../../../../styles.css',
})
export class AdminAppointmentsPage {

  private readonly publicService = inject(PublicService);
  private readonly adminService = inject(AdminService);
  private readonly auth = inject(AuthService);
  private readonly titleCasePipe = inject(TitleCasePipe);

  appointments = signal<AppointmentResponse[]>([]);
  doctors = signal<DoctorResponse[]>([]);
  patients = signal<PatientResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  appointmentColumns = appointmentColumns;
  appointmentActions = appointmentActions;

  doctorFieldOptions = computed(() =>
    this.doctors().map((docObj) => ({
      label: this.titleCasePipe.transform(docObj.doctorName),
      value: docObj.id,
    }))
  );

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

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.loadAppointments();
    this.loadDoctors();
    this.loadPatients();
  }

  // ── Loaders ────────────────────────────────────────────────────────────────

  loadDoctors(): void {
    this.loading.set(true);
    this.error.set(null);
    this.adminService.getAllDoctors().subscribe({
      next: (data) => { this.doctors.set(data);console.log(data); this.loading.set(false); },
      error: () => { this.error.set('Failed to Load Doctors'); this.loading.set(false); },
    });
  }

  loadPatients(): void {
    this.loading.set(true);
    this.error.set(null);
    this.adminService.getAllPatients().subscribe({
      next: (data) => { this.patients.set(data);console.log(data); this.loading.set(false); },
      error: () => { this.error.set('Failed to Load Patients'); this.loading.set(false); },
    });
  }

  loadAppointments(): void {
    this.loading.set(true);
    this.error.set(null);
    this.adminService.getAllAppointments().subscribe({
      next: (data) => { this.appointments.set(data); this.loading.set(false); },
      error: () => { this.error.set('Failed to Load Appointments'); this.loading.set(false); },
    });
  }

  // ── API actions ────────────────────────────────────────────────────────────

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

  // ── Modal handlers ─────────────────────────────────────────────────────────

  handleOpenCreate(): void {
    this.editingId = null;
    this.modalConfig = this.createConfig();
    this.modalFields = buildAppointmentFields(this.patientFieldOptions(), this.doctorFieldOptions());
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