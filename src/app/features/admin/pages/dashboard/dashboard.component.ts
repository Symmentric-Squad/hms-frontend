import { Component } from '@angular/core';
import { appointments, doctors, patients } from '../../../../shared/db/db';

@Component({
  selector: 'app-admin-dashboard',
  standalone:false,
  templateUrl: './dashboard.component.html',
  styleUrl: '../../../../../styles.css'
})
export class AdminDashboardPage {
  doctors = doctors;
  appointments = appointments;
  patients = patients;
  cardDetails: DashboardCardStats[] = [
    {
        icon: "🩺",
        value: this.stats.totalDoctors,
        label: "Total Doctors",
        FocusedStatus: "Active",
        StatusCount: 4,
        cardColor: "blue",
        link: '/admin'
    },
    {
        icon: "👥",
        value: this.stats.totalPatients,
        label: "Total Patients",
        FocusedStatus: "Active",
        StatusCount: 4,
        cardColor: "green",
        link: '/admin'
    },
    {
        icon: "📅",
        value: 3,
        label: "Scheduled",
        FocusedStatus: "Completed",
        StatusCount: 4,
        cardColor: "orange",
        link: '/admin'
    },
    {
        icon: "📋",
        value: this.stats.totalAppointments,
        label: "Total Appointments",
        FocusedStatus: "All time",
        cardColor: "red",
        link: '/admin'
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
