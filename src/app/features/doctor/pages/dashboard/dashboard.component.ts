import { Component,computed, inject, signal } from '@angular/core';
import { DoctorService } from '../../service/doctor.service';
import { AppointmentResponse, PatientResponse } from '../../models/doctor.model';
import { TableColumn } from '../../../../shared/models/data-table.models';
import { formatDate } from '@angular/common';

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

  doctorId:number = 0;

  ngOnInit(){
    this.doctorId = Number(localStorage.getItem('userId'));
    if (!this.doctorId || this.doctorId === 0) {
      this.error.set('Invalid User ID');
      return;
    }

    this.loadAppointments(this.doctorId);

    this.loadPatients(this.doctorId);
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

  loadPatients(doctorId: number): void {
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
      // { key: "doctorName", label: "Doctor" },
      { key: "appointmentDate", label: "Appt. Date" },
      { key: "appointmentTime", label: "Appt. Time"},
      { key: "currentStatus", label: "Status", type: 'badge',
        tagColors: {
          Active: { bg: '#dbeafe', text: '#1e40af' },
          'Cancel by Doctor': { bg: '#fee2e2', text: '#991b1b' },
          'Cancel by User': { bg: '#fee2e2', text: '#991b1b' },
          'Completed': { bg: '#d1fae5', text: '#065f46' },
        }
      }
    ];
}
