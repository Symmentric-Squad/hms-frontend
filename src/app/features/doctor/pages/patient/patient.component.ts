import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { patients, doctors } from '../../../../shared/db/db';
import { RowActionEvent, TableAction, TableColumn } from '../../../../shared/models/data-table.models';


@Component({
  selector: 'app-patient-management',
  standalone: false,
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class DoctorPatientsPage {
  patients = patients;
  doctors = doctors;

  // Table Configuration
  patientColumns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'phone', label: 'Phone' },
    { key: 'bloodGroup', label: 'Blood Group' },
    { key: 'doctor', label: 'Assigned Doctor' },
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

  showPatientModal = false;
  editingPatient: Partial<Patient> = {};
  isEditMode = false;

  get doctorNames(): string[] {
    return this.doctors.map(d => d.name);
  }

  openAddPatient() {
    this.editingPatient = { status: 'Active' };
    this.isEditMode = false;
    this.showPatientModal = true;
  }

  openEditPatient(p: Patient) {
    this.editingPatient = { ...p };
    this.isEditMode = true;
    this.showPatientModal = true;
  }

  savePatient() {
    if (this.isEditMode) {
      const idx = this.patients.findIndex(p => p.id === this.editingPatient.id);
      if (idx > -1) {
        this.patients[idx] = { ...this.patients[idx], ...this.editingPatient } as Patient;
      }
    } else {
      this.patients.push({ ...this.editingPatient, id: Date.now() } as Patient);
    }
    this.showPatientModal = false;
  }

  deletePatient(id: number) {
    if (confirm('Delete this patient?')) {
      this.patients = this.patients.filter(p => p.id !== id);
    }
  }

  // Handle table actions
  onTableAction(event: RowActionEvent): void {
    const { action, rowData } = event;

    if (action === 'edit') {
      this.openEditPatient(rowData);
    } else if (action === 'delete') {
      this.deletePatient(rowData.id);
    }
  }
}