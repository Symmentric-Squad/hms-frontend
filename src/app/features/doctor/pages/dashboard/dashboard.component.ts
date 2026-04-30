import { Component } from '@angular/core';
import { appointments, doctors, patients } from '../../../../shared/db/db';

@Component({
  selector: 'app-doctor-dashboard',
  standalone:false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DoctorDashboardPage {
  doctors = doctors;
  appointments = appointments;
  patients = patients;

  get recentAppointments() { return this.appointments.slice(0, 4); }

  get stats() {
    return {
      totalDoctors: this.doctors.length,
      activeDoctors: this.doctors.filter(d => d.status === 'Active').length,
      totalPatients: this.patients.length,
      activePatients: this.patients.filter(p => p.status === 'Active').length,
      totalAppointments: this.appointments.length,
      scheduledAppointments: this.appointments.filter(a => a.status === 'Scheduled').length,
      completedAppointments: this.appointments.filter(a => a.status === 'Completed').length,
    };
  }
}
