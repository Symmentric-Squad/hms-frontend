
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentRequest, AppointmentResponse, DoctorResponse, UserResponse } from '../../../../core/models/public.model';
import { PublicService } from '../../../../core/services/public.service';
import { patients } from '../../../../shared/db/db';
import { FormField, ModalConfig, ModalSubmitEvent } from '../../../../shared/models/form.models';
import { appointmentColumns, bookAppointmentModalConfig, buildAppointmentFields, buildProfileFields, editProfileModalConfig } from './dashboard.config';
import { TitleCasePipe } from '../../../../shared/pipe/custom-title-case.pipe';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
})
export class PatientDashboardPage {

  private readonly appointmentService = inject(PublicService);
  private readonly titleCasePipe = inject(TitleCasePipe);
  private readonly router = inject(Router);

  // ── Data Signals ──
  appointments = signal<AppointmentResponse[]>([]);
  doctors = signal<DoctorResponse[]>([]);
  userProfile = signal<UserResponse | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  patients = patients;
  userId: number = 0;

  // ── Computed doctor options for form ──
  doctorFieldOptions = computed(() =>
    this.doctors().map((docObj) => ({
      label: this.titleCasePipe.transform(docObj.doctorName),
      value: docObj.id,
    }))
  );

  // ── Appointment Modal State ──
  isAppointmentModalOpen = false;
  appointmentModalConfig: ModalConfig = bookAppointmentModalConfig;
  appointmentModalFields: FormField[] = [];

  // ── Profile Modal State ──
  isProfileModalOpen = false;
  profileModalConfig: ModalConfig = editProfileModalConfig;
  profileModalFields: FormField[] = [];

  private editingAppointmentId: number | null = null;

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    if (!this.userId || this.userId === 0) {
      this.error.set('Invalid User ID');
      return;
    }

    this.loadAppointments(this.userId);
    this.loadDoctors();
  }

  // ── Load Appointments ──
  loadAppointments(userId: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.appointmentService.getMyAppointments(userId).subscribe({
      next: (data) => {
        this.appointments.set(data);
        console.log('Appointments loaded:', data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to Load Appointments');
        this.loading.set(false);
      },
    });
  }

  // ── Load Doctors ──
  loadDoctors(): void {
    this.appointmentService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors.set(data);
      },
      error: () => {
        console.error('Failed to load doctors');
      },
    });
  }

  // ── CARD DETAILS AND FUNCTIONALITY ──
  cardDetails = [
    {
      icon: "review-file-svgrepo-com.svg",
      value: "Book Appointments",
      label: "Schedule a new Consultation",
      cardColor: "bg-blue-100",
      action: () => this.openAppointmentModal(),
    },
    {
      icon: "calender.svg",
      label: "View past and upcoming Appointments",
      value: "Appointment History",
      cardColor: "bg-green-100",
      action: () => {
        this.router.navigate(['/patient/appointments']);
      },
    },
    {
      icon: "tick_file.svg",
      value: "Medical History",
      label: "View past medical Records",
      cardColor: "bg-orange-100",
      action: () => {
        this.router.navigate(['/patient/reports']);
      },
    },
    {
      icon: "patient.svg",
      value: "Update Profile",
      label: "Manage your personal Details",
      cardColor: "bg-red-100",
      action: () => this.openProfileModal(),
    },
  ];

  appointmentColumns = appointmentColumns;

  // ── Appointment Modal Handlers ──
  openAppointmentModal(): void {
    this.editingAppointmentId = null;
    this.appointmentModalConfig = {
      title: 'Book Appointment',
      submitButtonText: 'Book Appointment',
      cancelButtonText: 'Cancel',
      size: 'medium',
      mode: 'create',
    };
    this.appointmentModalFields = buildAppointmentFields(this.doctorFieldOptions());
    this.isAppointmentModalOpen = true;
  }

  handleAppointmentSubmit(event: ModalSubmitEvent): void {
    console.log('📤 Appointment Form Submit Handler Called');
    console.log('📋 Submit Event Data:', event);

    if (!event.isValid) {
      this.error.set('Please fill in all required fields.');
      return;
    }

    if (this.editingAppointmentId === null) {
      // CREATE operation
      const createRequest = event.formData as AppointmentRequest;
      console.log('➕ Booking new appointment with data:', createRequest);
      this.bookAppointment(createRequest);
    }
  }

  handleAppointmentCancel(): void {
    console.log('❌ Appointment modal cancelled');
    this.closeAppointmentModal();
  }

  handleAppointmentBackdropClick(): void {
    console.log('❌ Appointment backdrop clicked - closing modal');
    this.closeAppointmentModal();
  }

  private closeAppointmentModal(): void {
    console.log('🔒 Closing appointment modal');
    this.isAppointmentModalOpen = false;
    this.editingAppointmentId = null;
  }

  bookAppointment(request: AppointmentRequest): void {
    this.loading.set(true);

    request.userId = this.userId;
    request.consultancyFees = 1000;
    this.appointmentService.bookAppointment(request).subscribe({
      next: (newAppointment) => {
        this.appointments.update((prev) => [...prev, newAppointment]);
        this.loading.set(false);
        this.closeAppointmentModal();
        console.log('✅ Appointment booked successfully');
      },
      error: () => {
        this.error.set('Failed to Book Appointment');
        this.loading.set(false);
      },
    });
  }

  // ── Profile Modal Handlers ──
  /**
   * Open profile modal in EDIT mode
   * - Fetches current user data from API using getUserById()
   * - Pre-fills form fields with existing user data
   * - Follows the doctor page pattern for edit workflows
   */
  openProfileModal(): void {
    console.log('🔓 Opening Profile Modal for user ID:', this.userId);
    this.loading.set(true);

    this.appointmentService.getUserById(this.userId).subscribe({
      next: (userData) => {
        console.log('✅ User data fetched successfully:', userData);
        this.userProfile.set(userData);
        
        // Pre-fill form fields with fetched user data
        this.profileModalConfig = {
          title: 'Edit Profile',
          submitButtonText: 'Update Profile',
          cancelButtonText: 'Cancel',
          size: 'medium',
          mode: 'edit',
        };
        this.profileModalFields = buildProfileFields(userData);
        this.isProfileModalOpen = true;
        this.loading.set(false);
      },
      error: (err) => {
        console.error('❌ Failed to fetch user data:', err);
        this.error.set('Failed to Load Profile Data');
        this.loading.set(false);
      },
    });
  }

  handleProfileSubmit(event: ModalSubmitEvent): void {
    console.log('📤 Profile Form Submit Handler Called');
    console.log('📋 Submit Event Data:', event);

    if (!event.isValid) {
      this.error.set('Please fill in all required fields.');
      return;
    }

    const profileData = event.formData;
    console.log('📝 Updating profile with data:', profileData);
    this.updateProfile(profileData);
  }

  handleProfileCancel(): void {
    console.log('❌ Profile modal cancelled');
    this.closeProfileModal();
  }

  handleProfileBackdropClick(): void {
    console.log('❌ Profile backdrop clicked - closing modal');
    this.closeProfileModal();
  }

  private closeProfileModal(): void {
    console.log('🔒 Closing profile modal');
    this.isProfileModalOpen = false;
  }

  updateProfile(profileData: any): void {
    this.loading.set(true);

    // Call the update API - adjust the endpoint based on your backend
    this.appointmentService.updateUser(this.userId, profileData).subscribe({
      next: (updatedUser) => {
        console.log('✅ Profile updated successfully:', updatedUser);
        this.userProfile.set(updatedUser);
        this.loading.set(false);
        this.closeProfileModal();
        this.error.set(null);
      },
      error: (err) => {
        console.error('❌ Failed to update profile:', err);
        this.error.set('Failed to Update Profile');
        this.loading.set(false);
      },
    });
  }
}