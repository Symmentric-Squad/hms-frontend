import { Component } from '@angular/core';
import { appointments, doctors, patients } from '../../../../shared/db/db';

@Component({
  selector: 'app-doctor-dashboard',
  standalone:false,
  templateUrl: './dashboard.component.html',
  styleUrl: '../common.css'
})
export class DoctorDashboardPage {
  doctors = doctors;
  appointments = appointments;
  patients = patients;
  //TODO: change the card details as per doctor
  cardDetails: DashboardCardStats[] = [
    {
        icon: "🩺",
        value: this.stats.totalDoctors,
        label: "Total Doctors",
        FocusedStatus: "Active",
        StatusCount: 4,
        cardColor: "blue"
    },
    {
        icon: "👥",
        value: this.stats.totalPatients,
        label: "Total Patients",
        FocusedStatus: "Active",
        StatusCount: 4,
        cardColor: "green"
    },
    {
        icon: "📅",
        value: 3,
        label: "Scheduled",
        FocusedStatus: "Completed",
        StatusCount: 4,
        cardColor: "orange"
    },
    {
        icon: "📋",
        value: this.stats.totalAppointments,
        label: "Total Appointments",
        FocusedStatus: "All time",
        cardColor: "red"
    }
  ]

  get recentAppointments() { return this.appointments.slice(0, 4); }

  get stats() {
    return {
      totalDoctors: this.doctors.length,
      activeDoctors: this.doctors.filter(d => d.status === 'Active').length,
      totalPatients: this.patients.length,
      activePatients: this.patients.filter(p => p.status === 'Admitted').length,
      totalAppointments: this.appointments.length,
      scheduledAppointments: this.appointments.filter(a => a.status === 'Scheduled').length,
      completedAppointments: this.appointments.filter(a => a.status === 'Completed').length,
    };
  }
}
