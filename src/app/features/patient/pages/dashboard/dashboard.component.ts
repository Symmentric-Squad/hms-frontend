import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentResponse } from '../../../../core/models/public.model';
import { PublicService } from '../../../../core/services/public.service';
import { ProfileUser } from '../../../../shared/components/top-panel/top-panel.component';
import { doctors, patients } from '../../../../shared/db/db';
import { ModalSubmitEvent } from '../../../../shared/models/form.models';
import { appointmentColumns, appointmentModalFields, bookAppointmentModalConfig, editProfileModalConfig, profileModalFields } from './dashboard.config';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  // styleUrl: '../../../../../styles.css'
})
export class PatientDashboardPage {

  private readonly appointmentService = inject(PublicService);

  appointments = signal<AppointmentResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  doctors = doctors;
  patients = patients;

  ngOnInit(): void {
    this.loadAppointments();
  }

  // ── Load 
  loadAppointments(userId: number = 1): void {
    this.loading.set(true);
    this.error.set(null);

    this.appointmentService.getMyAppointments(userId).subscribe({
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

  showBookAppointmentModal = false;
  editingAppointment: Partial<Appointment> = {};
  isBookEditMode = false;

  showEditProfileModal = false;
  editingProfile: Partial<ProfileUser> = {};
  isProfileEditMode = false;

  router = inject(Router)

  // CARD DETAILS AND FUNCTIONALITY
  cardDetails = [
    {
      icon: "review-file-svgrepo-com.svg",
      value: "Book Appointments",
      label: "Schedule a new Consultation",
      cardColor: "blue",
      action: () => {
        this.showBookAppointmentModal = true;
      }
    },
    {
      icon: "calender.svg",
      label: "View past and upcoming Appointments",
      value: "Appointment History",
      cardColor: "green",
      action: () => {
        this.router.navigate(['/patient/appointments'])
      }
    },
    {
      icon: "tick_file.svg",
      value: "Medical History",
      label: "View past medical Records",
      cardColor: "orange",
      action: () => {
        this.router.navigate(['/patient/reports'])
      }
    },
    {
      icon: "patient.svg",
      value: "Update Profile",
      label: "Manage your personal Details",
      cardColor: "red",
      action: () => {
        this.showEditProfileModal = true;
      }
    }
  ]

  bookAppointmentModalConfig = bookAppointmentModalConfig;
  appointmentModalFields = appointmentModalFields;
  editProfileModalConfig = editProfileModalConfig;
  profileModalFields = profileModalFields;
  appointmentColumns = appointmentColumns;


  onSubmitAppointment(event: ModalSubmitEvent): void {
    if (!event.isValid) {
      alert('Please fill in all required fields.');
      return;
    }
    console.log('Form submitted:', event.formData);
    this.showBookAppointmentModal = false;
  }

  onUpdateProfile(event: ModalSubmitEvent): void {
    if (!event.isValid) {
      alert('Please fill in all required fields.');
      return;
    }
    console.log('Form submitted:', event.formData);
    this.showBookAppointmentModal = false;
  }
}
