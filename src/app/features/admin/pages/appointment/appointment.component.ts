import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { appointments, doctors, patients } from '../../../../shared/db/db';
import { RowActionEvent, TableAction, TableColumn } from '../../../../shared/models/data-table.models';
import { Action } from 'rxjs/internal/scheduler/Action';
import { FormField, ModalConfig, ModalSubmitEvent } from '../../../../shared/models/form.models';



@Component({
  selector: 'app-appointment-history',
  standalone:false,
  templateUrl: './appointment.component.html',
  styleUrl: '../../../../../styles.css',
})
export class AdminAppointmentsPage {

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
      id: 'view',
      label: 'View',
      icon: 'eye.svg',
      type: 'secondary',
      actionColor: 'gray'
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: 'edit.svg',
      type: 'primary',
      actionColor: 'blue'
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: 'trash.svg',
      type: 'danger',
      actionColor: 'red'
    }
  ];

  appointmentModalConfig: ModalConfig = {
    title: 'Add Appointment',
    submitButtonText: 'Save Details',
    cancelButtonText: 'Cancel',
    size: 'medium',
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


  showAppointmentModal = false;
  editingAppointment: Partial<Appointment> = {};
  isEditMode = false;


  get recentAppointments() { return this.appointments.slice(0, 4); }
  get doctorNames() { return this.doctors.map(d => d.name); }

  onSubmit(event: ModalSubmitEvent): void {
    if (!event.isValid) {
      alert('Please fill in all required fields.');
      return;
    }
    console.log('Form submitted:', event.formData);
    this.showAppointmentModal = false;
  }

  openAddAppointment() { 
    console.log('Opening add appointment modal');
    this.editingAppointment = { status: 'Scheduled' };
    this.isEditMode = false;
    this.showAppointmentModal = true;
  }
  openEditAppointment(a: Appointment) {
    this.editingAppointment = { ...a };
    this.isEditMode = true;
    this.showAppointmentModal = true;
  }
  saveAppointment() {
    if (this.isEditMode) {
      const idx = this.appointments.findIndex(a => a.id === this.editingAppointment.id);
      if (idx > -1) this.appointments[idx] = { ...this.appointments[idx], ...this.editingAppointment } as Appointment;
    } else {
      this.appointments.push({ ...this.editingAppointment, id: Date.now() } as Appointment);
    }
    this.showAppointmentModal = false;
  }
  deleteAppointment(id: number) {
    if (confirm('Cancel this appointment?')){
      this.appointments = this.appointments.filter(a => a.id !== id);
    }
  }

  onAppointmentTableAction(event: RowActionEvent): void {
    const { action, rowData } = event;
    if (action === 'edit') {
      this.openEditAppointment(rowData);
    } else if (action === 'cancel') {
      this.deleteAppointment(rowData.id);
    }
  }

  constructor(private auth: AuthService) {}
}