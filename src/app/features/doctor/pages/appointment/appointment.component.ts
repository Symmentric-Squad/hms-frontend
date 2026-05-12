import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { PublicService } from '../../../../core/services/public.service';
import { doctors } from '../../../../shared/db/db';
import { RowActionEvent } from '../../../../shared/models/data-table.models';
import { FormField, ModalConfig, ModalSubmitEvent } from '../../../../shared/models/form.models';
import { AppointmentRequest } from '../../../admin/models/admin.model';
import { AppointmentResponse, PatientResponse } from '../../models/doctor.model';
import { DoctorService } from '../../service/doctor.service';

import { formatDate } from '@angular/common';
import { buildAppointmentFields, patientAppointmentActions, patientAppointmentColumns} from './appointment.config';
import { TitleCasePipe } from '../../../../shared/pipe/custom-title-case.pipe';

@Component({
  selector: 'app-appointment-history',
  standalone: false,
  templateUrl: './appointment.component.html',
  styleUrl: '../../../../../styles.css',
})
export class DoctorAppointmentsPage {

  private readonly publicService = inject(PublicService);
  private readonly doctorService = inject(DoctorService);
  private readonly auth = inject(AuthService);
    private readonly titleCasePipe = inject(TitleCasePipe);

  appointments = signal<AppointmentResponse[]>([]);
  patients = signal<PatientResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  doctors = doctors;
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
    this.loadAppointments();
    this.loadPatients();
  }

  // ── Load 

  loadPatients(): void {
    this.loading.set(true);
    this.error.set(null);
    // TODO: pass the doctorId here from auth
    this.doctorService.getMyPatients(1).subscribe({
      next: (data) => { this.patients.set(data);console.log(data); this.loading.set(false); },
      error: () => { this.error.set('Failed to Load Patients'); this.loading.set(false); },
    });
  }

  loadAppointments(doctorId: number = 1): void {
    this.loading.set(true);
    this.error.set(null);

    this.doctorService.getAppointments(doctorId).subscribe({
      next: (data) => {
        const formattedData = data.map(apt => ({
          ...apt,
          creationDate: formatDate(apt.creationDate, 'dd-MM-yyyy - HH:mm', 'en-US'),
          // creationDate: new Date(apt.creationDate).toLocaleDateString(),
        }));
        this.appointments.set(formattedData);
        console.log(formattedData)
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to Load Appointments');
        this.loading.set(false);
      },
    });
  }


  // ── Cancel
  cancelAppointment(appointmentId: number): void {
    if (!confirm('Cancel this appointment?')) return;

    this.publicService.cancelAppointment(appointmentId).subscribe({
      next: () => this.loadAppointments(),
      error: () => this.error.set('Failed to Cancel Appointment'),
    });
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