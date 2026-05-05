import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

interface Doctor {
  id: number; name: string; specialty: string; phone: string; email: string; status: 'Active' | 'Inactive';
}
interface Patient {
  id: number; name: string; age: number; phone: string; bloodGroup: string; doctor: string; status: 'Active' | 'Discharged';
}
interface Appointment {
  id: number; patient: string; doctor: string; date: string; time: string; status: 'Scheduled' | 'Completed' | 'Cancelled';
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  activeTab: 'dashboard' | 'doctors' | 'patients' | 'appointments' = 'dashboard';

  doctors: Doctor[] = [
    { id: 1, name: 'Dr. Arjun Mehta', specialty: 'Cardiology', phone: '+91 98765 11001', email: 'arjun.mehta@hospital.com', status: 'Active' },
    { id: 2, name: 'Dr. Priya Nair', specialty: 'Neurology', phone: '+91 98765 22002', email: 'priya.nair@hospital.com', status: 'Active' },
    { id: 3, name: 'Dr. Rajan Kumar', specialty: 'Orthopedics', phone: '+91 98765 33003', email: 'rajan.kumar@hospital.com', status: 'Inactive' },
    { id: 4, name: 'Dr. Shalini Rao', specialty: 'Pediatrics', phone: '+91 98765 44004', email: 'shalini.rao@hospital.com', status: 'Active' },
    { id: 5, name: 'Dr. Vikram Patel', specialty: 'ENT', phone: '+91 98765 55005', email: 'vikram.patel@hospital.com', status: 'Active' },
  ];

  patients: Patient[] = [
    { id: 1, name: 'Suresh Babu', age: 45, phone: '+91 90001 11111', bloodGroup: 'A+', doctor: 'Dr. Arjun Mehta', status: 'Active' },
    { id: 2, name: 'Kavitha Rajan', age: 32, phone: '+91 90002 22222', bloodGroup: 'B+', doctor: 'Dr. Priya Nair', status: 'Active' },
    { id: 3, name: 'Murugan S', age: 60, phone: '+91 90003 33333', bloodGroup: 'O-', doctor: 'Dr. Rajan Kumar', status: 'Discharged' },
    { id: 4, name: 'Deepa Krishnan', age: 28, phone: '+91 90004 44444', bloodGroup: 'AB+', doctor: 'Dr. Shalini Rao', status: 'Active' },
    { id: 5, name: 'Anand Velu', age: 52, phone: '+91 90005 55555', bloodGroup: 'A-', doctor: 'Dr. Vikram Patel', status: 'Active' },
  ];

  appointments: Appointment[] = [
    { id: 1, patient: 'Suresh Babu', doctor: 'Dr. Arjun Mehta', date: '2026-04-26', time: '09:00 AM', status: 'Scheduled' },
    { id: 2, patient: 'Kavitha Rajan', doctor: 'Dr. Priya Nair', date: '2026-04-26', time: '10:30 AM', status: 'Scheduled' },
    { id: 3, patient: 'Murugan S', doctor: 'Dr. Rajan Kumar', date: '2026-04-24', time: '02:00 PM', status: 'Completed' },
    { id: 4, patient: 'Deepa Krishnan', doctor: 'Dr. Shalini Rao', date: '2026-04-25', time: '11:00 AM', status: 'Completed' },
    { id: 5, patient: 'Anand Velu', doctor: 'Dr. Vikram Patel', date: '2026-04-27', time: '04:00 PM', status: 'Scheduled' },
    { id: 6, patient: 'Suresh Babu', doctor: 'Dr. Priya Nair', date: '2026-04-23', time: '09:30 AM', status: 'Cancelled' },
  ];

  showDoctorModal = false;
  showPatientModal = false;
  showAppointmentModal = false;
  editingDoctor: Partial<Doctor> = {};
  editingPatient: Partial<Patient> = {};
  editingAppointment: Partial<Appointment> = {};
  isEditMode = false;

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

  get recentAppointments() { return this.appointments.slice(0, 4); }
  get doctorNames() { return this.doctors.map(d => d.name); }

  openAddDoctor() { this.editingDoctor = { status: 'Active' }; this.isEditMode = false; this.showDoctorModal = true; }
  openEditDoctor(doc: Doctor) { this.editingDoctor = { ...doc }; this.isEditMode = true; this.showDoctorModal = true; }
  saveDoctor() {
    if (this.isEditMode) {
      const idx = this.doctors.findIndex(d => d.id === this.editingDoctor.id);
      if (idx > -1) this.doctors[idx] = { ...this.doctors[idx], ...this.editingDoctor } as Doctor;
    } else {
      this.doctors.push({ ...this.editingDoctor, id: Date.now() } as Doctor);
    }
    this.showDoctorModal = false;
  }
  deleteDoctor(id: number) { if (confirm('Delete this doctor?')) this.doctors = this.doctors.filter(d => d.id !== id); }

  openAddPatient() { this.editingPatient = { status: 'Active' }; this.isEditMode = false; this.showPatientModal = true; }
  openEditPatient(p: Patient) { this.editingPatient = { ...p }; this.isEditMode = true; this.showPatientModal = true; }
  savePatient() {
    if (this.isEditMode) {
      const idx = this.patients.findIndex(p => p.id === this.editingPatient.id);
      if (idx > -1) this.patients[idx] = { ...this.patients[idx], ...this.editingPatient } as Patient;
    } else {
      this.patients.push({ ...this.editingPatient, id: Date.now() } as Patient);
    }
    this.showPatientModal = false;
  }
  deletePatient(id: number) { if (confirm('Delete this patient?')) this.patients = this.patients.filter(p => p.id !== id); }

  openAddAppointment() { this.editingAppointment = { status: 'Scheduled' }; this.isEditMode = false; this.showAppointmentModal = true; }
  openEditAppointment(a: Appointment) { this.editingAppointment = { ...a }; this.isEditMode = true; this.showAppointmentModal = true; }
  saveAppointment() {
    if (this.isEditMode) {
      const idx = this.appointments.findIndex(a => a.id === this.editingAppointment.id);
      if (idx > -1) this.appointments[idx] = { ...this.appointments[idx], ...this.editingAppointment } as Appointment;
    } else {
      this.appointments.push({ ...this.editingAppointment, id: Date.now() } as Appointment);
    }
    this.showAppointmentModal = false;
  }
  deleteAppointment(id: number) { if (confirm('Cancel this appointment?')) this.appointments = this.appointments.filter(a => a.id !== id); }

  constructor(private auth: AuthService) {}
}
