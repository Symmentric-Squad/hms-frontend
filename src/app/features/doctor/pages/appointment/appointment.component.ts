import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { PublicService } from '../../../../core/services/public.service';
import { doctors, patients } from '../../../../shared/db/db';
import { RowActionEvent } from '../../../../shared/models/data-table.models';
import { ModalSubmitEvent } from '../../../../shared/models/form.models';
import { AppointmentRequest } from '../../../admin/models/admin.model';
import { AppointmentResponse } from '../../models/doctor.model';
import { DoctorService } from '../../service/doctor.service';

import {patientAppointmentColumns, patientAppointmentActions, patientAppointmentModalConfig, patientAppointmentModalFields, patientAppointmentEditModalConfig} from './appointment.config';



@Component({
  selector: 'app-appointment-history',
  standalone: false,
  templateUrl: './appointment.component.html',
  styleUrl: '../../../../../styles.css',
})
export class DoctorAppointmentsPage {

  private readonly appointmentService = inject(PublicService);
  private readonly doctorAppointmentService = inject(DoctorService);
  private readonly auth = inject(AuthService);

  appointments = signal<AppointmentResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  doctors = doctors;
  patients = patients;
  appointmentColumns = patientAppointmentColumns;
  appointmentActions = patientAppointmentActions;
  appointmentModalConfig = patientAppointmentModalConfig;
  appointmentModalFields = patientAppointmentModalFields;
  appointmentEditModalConfig = patientAppointmentEditModalConfig;

  ngOnInit(): void {
    this.loadAppointments();
  }

  // ── Load 
  loadAppointments(doctorId: number = 1): void {
    this.loading.set(true);
    this.error.set(null);

    this.doctorAppointmentService.getAppointments(doctorId).subscribe({
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


  // ── Cancel
  cancelAppointment(appointmentId: number): void {
    if (!confirm('Cancel this appointment?')) return;

    this.appointmentService.cancelAppointment(appointmentId).subscribe({
      next: () => this.loadAppointments(),
      error: () => this.error.set('Failed to Cancel Appointment'),
    });
  }


  // ── Modal state
  showAppointmentModal = false;

  showAppointmentEditModal = false;
  editingAppointment: Partial<AppointmentRequest> = {};

  onSubmit(event: ModalSubmitEvent): void {
    if (!event.isValid) {
      alert('Please fill in all required fields.');
      return;
    }
    // TODO: call the Edit appointment API
  }

  // ── Row actions
  onAppointmentTableAction(event: RowActionEvent): void {
    const { action, rowData } = event;
    if (action === 'edit') {
      this.editingAppointment = { ...rowData };
      console.log(this.editingAppointment)
      this.showAppointmentEditModal = true;
    } else if (action === 'cancel') {
      this.cancelAppointment(rowData.id);
    }
  }
}