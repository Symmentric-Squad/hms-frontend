import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { doctors } from '../../../../shared/db/db';
import { RowActionEvent, TableAction, TableColumn } from '../../../../shared/models/data-table.models';
import { AdminService } from '../../service/admin.service';
import { CreateDoctorRequest, DoctorResponse } from '../../models/admin.model';
import { doctorActions, doctorColumns, doctorModalConfig, doctorModalFields } from './doctor.config';
import { ModalSubmitEvent } from '../../../../shared/models/form.models';

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
  editingId = signal<number | null>(null);

  doctorColumns = doctorColumns;
  doctorActions = doctorActions;
  doctorModalConfig = doctorModalConfig;
  doctorModalFields = doctorModalFields;

  // ── Modal state
  showDoctorModal = false;
  isViewMode = signal(false);
  doctorModalData: Partial<DoctorResponse> | null = null;

  ngOnInit(): void {
    this.loadDoctors();
  }

  // ── Load
  loadDoctors(): void {
    this.loading.set(true);
    this.error.set(null);
    this.adminService.getAllDoctors().subscribe({
      next: (data) => { this.doctors.set(data); this.loading.set(false); },
      error: () => { this.error.set('Failed to Load Doctors'); this.loading.set(false); },
    });
  }

  // ── Add
  addDoctor(request: CreateDoctorRequest): void {
    this.loading.set(true);
    this.adminService.createDoctor(request).subscribe({
      next: (newDoctor) => {
        this.doctors.update((prev) => [...prev, newDoctor]);
        this.loading.set(false);
        this.showDoctorModal = false;
      },
      error: () => { this.error.set('Failed to Add Doctor'); this.loading.set(false); },
    });
  }

  // ── Edit
  editDoctor(id: number, request: CreateDoctorRequest): void {
    this.loading.set(true);
    this.adminService.updateDoctor(id, request).subscribe({
      next: (updated) => {
        this.doctors.update((prev) =>
          prev.map((d) => (d.id === id ? updated : d))
        );
        this.loading.set(false);
        this.showDoctorModal = false;
      },
      error: () => { this.error.set('Failed to Update Doctor'); this.loading.set(false); },
    });
  }

  // ── Delete
  deleteDoctor(id: number): void {
    // if (!confirm('Delete this doctor?')) return;
    // this.adminService.deleteDoctor(id).subscribe({
    //   next: () => {
    //     this.doctors.update((prev) => prev.filter((d) => d.id !== id));
    //   },
    //   error: () => this.error.set('Failed to Delete Doctor'),
    // });
  }

  // ── Open modal helpers
  openAddDoctor(): void {
    this.editingId.set(null);
    this.isViewMode.set(false);
    this.doctorModalData = null;       // clears form
    this.showDoctorModal = true;
  }

  openEditDoctor(rowData: DoctorResponse): void {
    this.editingId.set(rowData.id);
    this.isViewMode.set(false);
    this.doctorModalData = { ...rowData };
    this.showDoctorModal = true;
  }

  openViewDoctor(rowData: DoctorResponse): void {
    this.editingId.set(null);
    this.isViewMode.set(true);
    this.doctorModalData = { ...rowData };
    this.showDoctorModal = true;
  }

  // ── Submit
  onSubmit(event: ModalSubmitEvent): void {
    if (!event.isValid) { alert('Please fill in all required fields.'); return; }
    const id = this.editingId();
    if (id !== null) {
      this.editDoctor(id, event.formData as CreateDoctorRequest);
    } else {
      this.addDoctor(event.formData as CreateDoctorRequest);
    }
  }

  // ── Row actions
  onTableAction(event: RowActionEvent): void {
    const { action, rowData } = event;
    if (action === 'edit') this.openEditDoctor(rowData);
    if (action === 'view') this.openViewDoctor(rowData);
    // if (action === 'delete') this.deleteDoctor(rowData.id);
  }
}