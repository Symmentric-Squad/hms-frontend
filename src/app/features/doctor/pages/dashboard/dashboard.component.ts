import { Component,computed, inject, signal } from '@angular/core';
import { DoctorService } from '../../service/doctor.service';
import { AppointmentResponse, PatientResponse } from '../../models/doctor.model';

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

  //TODO: change the card details as per doctor
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

}
