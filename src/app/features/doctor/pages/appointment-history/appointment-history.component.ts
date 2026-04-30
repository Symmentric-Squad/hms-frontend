import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { appointments, doctors, patients } from '../../../../shared/db/db';
import { RowActionEvent, TableAction, TableColumn } from '../../../../shared/models/data-table.models';



@Component({
  selector: 'app-appointment-history',
  standalone:false,
  templateUrl: './appointment-history.component.html',
  styleUrl: './appointment-history.component.css',
})
export class AppointmentHistory {

  doctors = doctors;
  patients = patients
  appointments = appointments;

  // Table Configuration
  appointmentColumns: TableColumn[] = [
    { key: 'patient', label: 'Patient' },
    { key: 'doctor', label: 'Doctor' },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    {
      key: 'status',
      label: 'Status',
      type: 'badge',
      tagColors: {
        'Scheduled': { bg: '#dbeafe', text: '#1e40af' },
        'Completed': { bg: '#d1fae5', text: '#065f46' },
        'Cancelled': { bg: '#fee2e2', text: '#991b1b' },
      },
    },
  ];

  appointmentActions: TableAction[] = [
    {
      id: 'edit',
      label: 'Edit',
      icon: '✏️',
      type: 'primary',
    },
    {
      id: 'cancel',
      label: 'Cancel',
      icon: '🗑️',
      type: 'danger',
    },
  ];

  doctorColumns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'specialty', label: 'Specialty' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    {
      key: 'status',
      label: 'Status',
      type: 'badge',
      tagColors: {
        'Active': { bg: '#d1fae5', text: '#065f46' },
        'Inactive': { bg: '#fee2e2', text: '#991b1b' },
      },
    },
  ];

  doctorActions: TableAction[] = [
    {
      id: 'edit',
      label: 'Edit',
      icon: '✏️',
      type: 'primary',
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: '🗑️',
      type: 'danger',
    },
  ];

  patientColumns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'phone', label: 'Phone' },
    { key: 'bloodGroup', label: 'Blood Group' },
    { key: 'doctor', label: 'Doctor' },
    {
      key: 'status',
      label: 'Status',
      type: 'badge',
      tagColors: {
        'Active': { bg: '#d1fae5', text: '#065f46' },
        'Discharged': { bg: '#fef3c7', text: '#92400e' },
      },
    },
  ];

  patientActions: TableAction[] = [
    {
      id: 'edit',
      label: 'Edit',
      icon: '✏️',
      type: 'primary',
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: '🗑️',
      type: 'danger',
    },
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

  openAddAppointment() { 
    console.log('Opening add appointment modal');
    this.editingAppointment = { status: 'Scheduled' };
    this.isEditMode = false;
    this.showAppointmentModal = true;
  }
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

  // Handle table actions
  onTableAction(event: RowActionEvent, type: 'appointment' | 'doctor' | 'patient'): void {
    const { action, rowData } = event;

    switch (type) {
      case 'appointment':
        this.handleAppointmentAction(action, rowData);
        break;
      // case 'doctor':
      //   this.handleDoctorAction(action, rowData);
      //   break;
      // case 'patient':
      //   this.handlePatientAction(action, rowData);
      //   break;
    }
  }

  private handleAppointmentAction(action: string, rowData: Appointment): void {
    if (action === 'edit') {
      this.openEditAppointment(rowData);
    } else if (action === 'cancel') {
      this.deleteAppointment(rowData.id);
    }
  }

  // private handleDoctorAction(action: string, rowData: Doctor): void {
  //   if (action === 'edit') {
  //     this.editingDoctor = { ...rowData };
  //     this.isEditMode = true;
  //     this.showDoctorModal = true;
  //   } else if (action === 'delete') {
  //     if (confirm(`Delete doctor ${rowData.name}?`)) {
  //       this.doctors = this.doctors.filter(d => d.id !== rowData.id);
  //     }
  //   }
  // }

  // private handlePatientAction(action: string, rowData: Patient): void {
  //   if (action === 'edit') {
  //     this.editingPatient = { ...rowData };
  //     this.isEditMode = true;
  //     this.showPatientModal = true;
  //   } else if (action === 'delete') {
  //     if (confirm(`Delete patient ${rowData.name}?`)) {
  //       this.patients = this.patients.filter(p => p.id !== rowData.id);
  //     }
  //   }
  // }

  constructor(private auth: AuthService) {}
}