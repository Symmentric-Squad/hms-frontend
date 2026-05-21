import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AppointmentResponse } from '../../../../core/models/public.model';
import { TableColumn } from '../../../../shared/models/data-table.models';
import { DashboardResponse, DoctorResponse, PatientResponse } from '../../models/admin.model';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';

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
  patients = signal<PatientResponse[]>([]);
  dashboardDetails = signal<DashboardResponse | null>(null);

  private readonly adminService = inject(AdminService);
  private readonly router = inject(Router);

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
  ];

  appointmentActions = [];

  ngOnInit(): void {
    // ✅ FIX: Verify token exists before making API calls
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('❌ No token found! Redirecting to login...');
      this.error.set('Authentication required');
      this.router.navigate(['/login']);
      return;
    }

    console.log('✅ Token found, loading dashboard data...');
    // Load all data in parallel
    this.loadDashboardDetails();
    this.loadAppointments();
    this.loadDoctors();
    this.loadPatients();
  }

  loadPatients(): void {
    this.loading.set(true);
    this.error.set(null);

    this.adminService.getAllPatients().subscribe({
      next: (data) => {
        console.log('✅ Patients loaded successfully:', data);
        this.patients.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('❌ Failed to load patients:', err);
        this.error.set('Failed to load patients');
        this.loading.set(false);

        // ✅ FIX: Handle 401 Unauthorized - token expired or invalid
        if (err.status === 401) {
          console.warn('⚠️ Received 401: Token expired or invalid. Clearing storage and redirecting to login...');
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      },
    });
  }

  loadDashboardDetails(): void {
    this.loading.set(true);
    this.error.set(null);

    this.adminService.getDashboard().subscribe({
      next: (data) => {
        console.log('✅ Dashboard details loaded successfully:', data);
        this.dashboardDetails.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('❌ Failed to load dashboard details:', err);
        this.error.set('Failed to load dashboard details');
        this.loading.set(false);

        // ✅ FIX: Handle 401 Unauthorized - token expired or invalid
        if (err.status === 401) {
          console.warn('⚠️ Received 401: Token expired or invalid. Clearing storage and redirecting to login...');
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      },
    });
  }

  loadAppointments(): void {
    this.loading.set(true);
    this.error.set(null);

    this.adminService.getAllAppointments().subscribe({
      next: (data) => {
        console.log('✅ Appointments loaded successfully:', data);
        this.appointments.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('❌ Failed to load appointments:', err);
        this.error.set('Failed to load appointments');
        this.loading.set(false);

        // ✅ FIX: Handle 401 Unauthorized - token expired or invalid
        if (err.status === 401) {
          console.warn('⚠️ Received 401: Token expired or invalid. Clearing storage and redirecting to login...');
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      },
    });
  }

  loadDoctors(): void {
    this.loading.set(true);
    this.error.set(null);

    this.adminService.getAllDoctors().subscribe({
      next: (data) => {
        console.log('✅ Doctors loaded successfully:', data);
        this.doctors.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('❌ Failed to load doctors:', err);
        this.error.set('Failed to load doctors');
        this.loading.set(false);

        // ✅ FIX: Handle 401 Unauthorized - token expired or invalid
        if (err.status === 401) {
          console.warn('⚠️ Received 401: Token expired or invalid. Clearing storage and redirecting to login...');
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      },
    });
  }
}