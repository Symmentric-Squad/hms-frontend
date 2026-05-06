import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { doctors } from '../../../../shared/db/db';
import { RowActionEvent, TableAction, TableColumn } from '../../../../shared/models/data-table.models';

@Component({
  selector: 'app-admin-doctor',
  standalone: false,
  templateUrl: 'doctor.component.html',
  styleUrl: '../../../../../styles.css',
})
export class AdminDoctorsPage {
  doctors = doctors;

  // Table Configuration
  doctorColumns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'speciality', label: 'Speciality' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'E Mail' },
    {
      key: 'status',
      label: 'Status',
      type: 'badge',
      tagColors: {
        'Active':    { bg: '#d1fae5', text: '#065f46' },
        'Inactive':  { bg: '#fef3c7', text: '#92400e' },
      },
    },
  ];

  doctorActions: TableAction[] = [
    // {
    //   id: 'view',
    //   label: 'View',
    //   icon: 'eye.svg',
    //   type: 'secondary',
    //   actionColor: 'gray'
    // },
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

  showDoctorModal = false;
  editingDoctor: Partial<Doctor> = {};
  isEditMode = false;

  // ── CRUD helpers ────────────────────────────────────────────────────────────

  openAddDoctor(): void {
    this.editingDoctor = { status: 'Active' };
    this.isEditMode = false;
    this.showDoctorModal = true;
  }

  openEditDoctor(d: Doctor): void {
    this.editingDoctor = { ...d };
    this.isEditMode = true;
    this.showDoctorModal = true;
  }

  saveDoctor(): void {
    if (this.isEditMode) {
      const idx = this.doctors.findIndex(d => d.id === this.editingDoctor.id);
      if (idx > -1) {
        this.doctors[idx] = { ...this.doctors[idx], ...this.editingDoctor } as Doctor;
      }
    } else {
      this.doctors.push({ ...this.editingDoctor, id: Date.now() } as Doctor);
    }
    this.showDoctorModal = false;
  }

  deleteDoctor(id: number): void {
    if (confirm('Delete this doctor?')) {
      this.doctors = this.doctors.filter(d => d.id !== id);
    }
  }

  // ── Table action dispatcher ──────────────────────────────────────────────────

  onTableAction(event: RowActionEvent): void {
    const { action, rowData } = event;

    if (action === 'edit') {
      this.openEditDoctor(rowData);
    } else if (action === 'delete') {
      this.deleteDoctor(rowData.id);
    }
  }
}