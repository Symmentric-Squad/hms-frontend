import { Component } from '@angular/core';
import { appointments, doctors, patients, reports } from '../../../../shared/db/db';

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
  reports = reports;
  //TODO: change the card details as per admin
  cardDetails: DashboardCardStats[] = [
    {
        icon: "steth.svg",
        value: this.stats.totalDoctors,
        label: "Total Doctors",
        FocusedStatus: "Active",
        StatusCount: 4,
        cardColor: "blue",
        link: '/admin/doctors'
    },
    {
        icon: "patient.svg",
        value: this.stats.totalPatients,
        label: "Total Patients",
        FocusedStatus: "Active",
        StatusCount: 4,
        cardColor: "green",
        link: '/admin/patients'
    },
    {
        icon: "calender.svg",
        value: this.stats.totalAppointments,
        label: "Total Appointments",
        FocusedStatus: "Completed",
        StatusCount: 4,
        cardColor: "orange",
        link: '/admin/appointments'
      },
      {
        icon: "tick_file.svg",
        value: this.stats.totalReports,
        label: "Total Reports",
        FocusedStatus: "All time",
        cardColor: "red",
        link: '/admin/reports'
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
      totalReports: this.reports.length
    };
  }
}
