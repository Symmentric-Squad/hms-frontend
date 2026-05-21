import { Component,computed, inject, signal } from '@angular/core';
import { DoctorService } from '../../service/doctor.service';
import { AppointmentResponse, PatientResponse } from '../../models/doctor.model';
import { TableColumn } from '../../../../shared/models/data-table.models';

@Component({
  selector: 'app-doctor-dashboard',
  standalone:false,
  templateUrl: './dashboard.component.html',
  styleUrl: '../../../../../styles.css'
})
export class DoctorDashboardPage {

  private readonly doctorService = inject(DoctorService);

  appointments = signal<AppointmentResponse[]>([]);
  patients = signal<PatientResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(){

    this.loadAppointments();

    this.loadPatients();
  }

  loadAppointments(doctorId: number = 1): void {
    this.loading.set(true);
    this.doctorService.getAppointments(doctorId).subscribe({
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

  loadPatients(doctorId: number = 1): void {
    this.loading.set(true);
    this.error.set(null);

    this.doctorService.getMyPatients(doctorId).subscribe({
      next: (data) => {
        this.patients.set(data);
        console.log(data)
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to Load Reports');
        this.loading.set(false);
      },
    });
  }

  cardDetails = computed<DashboardCardStats[]>(() => [
    {
        icon: "patient.svg",
        value: this.patients().length,
        label: "My Patients",
        cardColor: "green",
        link: '/doctor/patients'
    },
    {
        icon: "calender.svg",
        value: this.appointments().length,
        label: "My Appointments",
        cardColor: "orange",
        link: '/doctor/appointments'
      },
  ]);

  appointmentActions = [];

  appointmentColumns: TableColumn[] = [
      { key: "patientName", label: "Patient" },
      { key: "doctorName", label: "Doctor" },
      { key: "appointmentDate", label: "Appt. Date" },
      { key: "currentStatus", label: "Status", type: 'badge',
        tagColors: {
          Active: { bg: '#dbeafe', text: '#1e40af' },
          'Cancel by Doctor': { bg: '#fee2e2', text: '#991b1b' },
          'Cancel by User': { bg: '#fee2e2', text: '#991b1b' },
        }
      }
    ];
}
