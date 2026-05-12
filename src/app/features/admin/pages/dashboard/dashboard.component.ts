import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AppointmentResponse } from '../../../../core/models/public.model';
import { TableColumn } from '../../../../shared/models/data-table.models';
import { DashboardResponse, DoctorResponse } from '../../models/admin.model'; // Ensure DashboardCardStats is imported
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: '../../../../../styles.css'
})
export class AdminDashboardPage implements OnInit {
  loading = signal(false);
  error = signal<string | null>(null);

  doctors = signal<DoctorResponse[]>([]);
  appointments = signal<AppointmentResponse[]>([]);
  dashboardDetails = signal<DashboardResponse | null>(null);
  

  private readonly adminService = inject(AdminService);

  cardDetails = computed<DashboardCardStats[]>(() => [
    {
      icon: "steth.svg",
      value: this.dashboardDetails()?.doctorCount ?? 0,
      label: "Total Doctors",
      cardColor: "blue",
      link: '/admin/doctors'
    },
    {
      icon: "patient.svg",
      value: this.dashboardDetails()?.userCount ?? 0,
      label: "Total Patients",
      cardColor: "green",
      link: '/admin/patients'
    },
    {
      icon: "calender.svg",
      value: this.dashboardDetails()?.appointmentCount ?? 0,
      label: "Total Appointments",
      cardColor: "orange",
      link: '/admin/appointments'
    },
    {
      icon: "tick_file.svg",
      value: this.dashboardDetails()?.queriesCount ?? 0,
      label: "Total Queries",
      cardColor: "red",
      link: '/admin/reports'
    }
  ]);

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

  appointmentActions = [];

  ngOnInit(): void {
    // 3. You MUST call both or you won't get any data!
    this.loadDashboardDetails(); 
    this.loadAppointments();
    this.loadDoctors();
  }

  loadDashboardDetails() {
    this.loading.set(true);
    this.adminService.getDashboard().subscribe({
      next: (data) => {
        this.dashboardDetails.set(data);
        console.log(this.dashboardDetails());
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to Load Dashboard Details');
        this.loading.set(false);
      },
    });
  }

  loadAppointments(): void {
    this.loading.set(true);
    this.adminService.getAllAppointments().subscribe({
      next: (data) => {
        this.appointments.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to Load Appointments');
        this.loading.set(false);
      },
    });
  }

  loadDoctors(){
    this.loading.set(true);
    this.adminService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to Load Doctors');
        this.loading.set(false);
      },
    })
  }
}