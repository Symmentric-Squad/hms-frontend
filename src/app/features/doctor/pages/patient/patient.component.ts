import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { patients, doctors } from '../../../../shared/db/db';
import { RowActionEvent, TableAction, TableColumn } from '../../../../shared/models/data-table.models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-patient-management',
  standalone: false,
  templateUrl: './patient.component.html',
  styleUrl: '../../../../../styles.css',
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
        'Admitted': { bg: '#d1fae5', text: '#065f46' },
        'Discharged': { bg: '#fef3c7', text: '#92400e' },
      },
    },
  ];

  patientActions: TableAction[] = [
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

  showPatientModal = false;
  editingPatient: Partial<Patient> = {};
  isEditMode = false;

  get doctorNames(): string[] {
    return this.doctors.map(d => d.name);
  }

  constructor(private router: Router) {}

  openAddPatient() {
    this.editingPatient = { status: 'Admitted' };
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
    } else if (action == 'view') {
      this.router.navigate(['doctor/patients',rowData.id]);
    }
  }
}