import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { doctors } from '../../../../shared/db/db';
import { RowActionEvent, TableAction, TableColumn } from '../../../../shared/models/data-table.models';
import { AdminService } from '../../service/admin.service';
import { CreateDoctorRequest, DoctorResponse } from '../../models/admin.model';
import { doctorActions, doctorColumns } from './doctor.config';

@Component({
  selector: 'app-admin-doctor',
  standalone: false,
  templateUrl: 'doctor.component.html',
  styleUrl: '../../../../../styles.css',
})
export class AdminDoctorsPage {

  private readonly adminService = inject(AdminService);

  doctors = signal<DoctorResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  doctorColumns = doctorColumns;
  doctorActions = doctorActions;

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors():void {
    this.loading.set(true);
    this.error.set(null);

    this.adminService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors.set(data);
        console.log(data)
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to Load Reports');
        this.loading.set(false);
      },
    });
  }

  // ── Add 
  // addDoctor(request: CreateDoctorRequest): void {
  //   this.loading.set(true);

  //   console.log("req",request)

  //   this.adminService.createPatient(request).subscribe({
  //     next: (newPatient) => {
  //       console.log(newPatient)
  //       this.doctors.update((prev) => [...prev, newPatient]);
  //       this.loading.set(false);
  //       this.showPatientModal = false;
  //     },
  //     error: () => {
  //       this.error.set('Failed to Add Patient');
  //       this.loading.set(false);
  //     },
  //   });
  // }

  

  showDoctorModal = false;
  editingDoctor: Partial<Doctor> = {};
  isEditMode = false;

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
    // if (this.isEditMode) {
    //   const idx = this.doctors.findIndex(d => d.id === this.editingDoctor.id);
    //   if (idx > -1) {
    //     this.doctors[idx] = { ...this.doctors[idx], ...this.editingDoctor } as Doctor;
    //   }
    // } else {
    //   this.doctors.push({ ...this.editingDoctor, id: Date.now() } as Doctor);
    // }
    // this.showDoctorModal = false;
  }

  deleteDoctor(id: number): void {
    // if (confirm('Delete this doctor?')) {
    //   this.doctors = this.doctors.filter(d => d.id !== id);
    // }
  }

  onTableAction(event: RowActionEvent): void {
    const { action, rowData } = event;

    if (action === 'edit') {
      this.openEditDoctor(rowData);
    } else if (action === 'delete') {
      this.deleteDoctor(rowData.id);
    }
  }
}