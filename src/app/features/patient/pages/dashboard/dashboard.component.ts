import { Component, inject } from '@angular/core';
import { appointments, doctors, patients } from '../../../../shared/db/db';
import { Router } from '@angular/router';
import { FormField, ModalConfig, ModalSubmitEvent } from '../../../../shared/models/form.models';
import { ProfileUser } from '../../../../shared/components/top-panel/top-panel.component';

@Component({
  selector: 'app-doctor-dashboard',
  standalone:false,
  templateUrl: './dashboard.component.html',
  styleUrl: '../../../../../styles.css'
})
export class PatientDashboardPage {
  doctors = doctors;
  appointments = appointments;
  patients = patients;

  showBookAppointmentModal = false;
  editingAppointment: Partial<Appointment> = {};
  isBookEditMode = false;

  showEditProfileModal = false;
  editingProfile: Partial<ProfileUser> = {};
  isProfileEditMode = false;

  router = inject(Router)
  //TODO: change the card details as per patient
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

  BookAppointmentModalConfig: ModalConfig = {
    title: 'New Appointment',
    submitButtonText: 'Book Appointment',
    cancelButtonText: 'Cancel',
    size: 'small',
    mode: 'create',
  }
  
  appointmentModalFields: FormField[] = [
    {
      key: 'patient name',
      label: 'Patient Name',
      type: 'text',
      required:true
    },
    {
      key: 'doctor',
      label: 'Doctor Name',
      type: 'text',
      required:true
    },
    {
      key: 'date',
      label: 'Appointment Date',
      type: 'date',
      required:true
    },
    {
      key: 'time',
      label: 'Appointment Time',
      type: 'time',
      required:true
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      required:true,
      options: [
        {label:"Scheduled", value: "Scheduled"},
        {label:"Completed", value: "Completed"},
        {label:"Cancelled", value: "Cancelled"},
      ]
    },
  ]

  editProfileModalConfig: ModalConfig = {
    title: 'Edit Profile',
    submitButtonText: 'Edit Profile',
    cancelButtonText: 'Cancel',
    size: 'small',
    mode: 'create',
  }
  
  profileModalFields: FormField[] = [
    {
      key: 'name',
      label: 'Name',
      type: 'text',
      required:true
    },
    {
      key: 'gender',
      label: 'Gender',
      type: 'text',
      required:true
    },
    {
      key: 'address',
      label: 'Address',
      type: 'text',
      required:true
    },
    {
      key: 'city',
      label: 'City',
      type: 'text',
      required:true
    },
    {
      key: 'email',
      label: 'Email',
      type: 'email',
      required:true,
    },
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

    onSubmitAppointment(event: ModalSubmitEvent): void {
      if (!event.isValid) {
        alert('Please fill in all required fields.');
        return;
      }
      console.log('Form submitted:', event.formData);
      this.showBookAppointmentModal= false;
    }

    onUpdateProfile(event: ModalSubmitEvent): void {
      if (!event.isValid) {
        alert('Please fill in all required fields.');
        return;
      }
      console.log('Form submitted:', event.formData);
      this.showBookAppointmentModal= false;
    }
}
