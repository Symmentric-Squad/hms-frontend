import { Component, computed, inject, signal } from '@angular/core';
import { RowActionEvent } from '../../../../shared/models/data-table.models';
import { FieldOption, FormField, ModalConfig, ModalSubmitEvent } from '../../../../shared/models/form.models';
import { CreateDoctorRequest, DoctorResponse, SpecializationResponse } from '../../models/admin.model';
import { AdminService } from '../../service/admin.service';
import { buildDoctorFields, doctorActions, doctorColumns } from './doctor.config';
import { TitleCasePipe } from '../../../../shared/pipe/custom-title-case.pipe';


@Component({
  selector: 'app-admin-doctor',
  standalone: false,
  templateUrl: 'doctor.component.html',
  styleUrl: '../../../../../styles.css',
})
export class AdminDoctorsPage {
  private readonly adminService = inject(AdminService);
  private readonly titleCasePipe = inject(TitleCasePipe);

  specializations = signal<SpecializationResponse[]>([]);
  // specializationFieldOptions = signal<FieldOption[]>([]);

  doctors = signal<DoctorResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  doctorColumns = doctorColumns;
  doctorActions = doctorActions;

  specializationFieldOptions = computed(() => {
    console.log('Computing options with:', this.specializations());

    return this.specializations().map((specObj) => ({
      label: this.titleCasePipe.transform(specObj.specialization),
      value: specObj.specialization
    }));
  });

  ngOnInit(): void {
    this.loadDoctors();
    this.loadSpecialization();
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


  loadSpecialization(): void {
    this.loading.set(true);
    this.error.set(null);

    this.adminService.getAllSpecializations().subscribe({
      next: (data) => {
        this.specializations.set(data);
        console.log(data)
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to Load specialization');
        this.loading.set(false);
      },
    });
  }

  // ── Add
  addDoctor(request: CreateDoctorRequest): void {
    this.loading.set(true);
    this.adminService.createDoctor(request).subscribe({
      next: (newDoctor) => {
        this.doctors.update((prev) => [...prev, newDoctor]);
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
      },
      error: () => { this.error.set('Failed to Update Doctor'); this.loading.set(false); },
    });
  }
  isModalOpen = false;
  modalConfig: ModalConfig = this.createConfig();
  modalFields: FormField[] = [];

  private editingId: number | null = null;
  private nextId = 3;

  // ── Handlers ───────────────────────────────────────────────────────────────

  handleOpenCreate(): void {
    this.editingId = null;
    this.modalConfig = this.createConfig();
    this.modalFields = buildDoctorFields(this.specializationFieldOptions());
    this.isModalOpen = true;
  }

  handleOpenEdit(employee: DoctorResponse): void {
    this.editingId = employee.id;
    this.modalConfig = this.editConfig();
    this.modalFields = buildDoctorFields(this.specializationFieldOptions(), employee);
    this.isModalOpen = true;
  }

  // Modal only emits when form is valid — no isValid guard needed here
  handleSubmit(event: ModalSubmitEvent): void {
    const formData = event.formData as Omit<DoctorResponse, 'id'>;

    if (this.editingId === null) {
      const newEmployee: DoctorResponse = {
        id: this.nextId++,
        ...formData,
      };
      this.doctors.update(currentDoctors => [...currentDoctors, newEmployee]);
    } else {
      this.doctors.update(currentDoctors =>
        currentDoctors.map(doc =>
          doc.id === this.editingId
            ? { ...doc, ...formData }
            : doc
        )
      );
    }

    this.closeModal();
  }

  handleDelete(id: number): void {
    // Use .update() with a filter to remove the item
    this.doctors.update(currentDoctors =>
      currentDoctors.filter(doc => doc.id !== id)
    );
  }

  handleCancel(): void {
    this.closeModal();
  }

  handleBackdropClick(): void {
    this.closeModal();
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  private closeModal(): void {
    this.isModalOpen = false;
    this.editingId = null;
  }

  private createConfig(): ModalConfig {
    return {
      title: 'Add Doctor',
      submitButtonText: 'Add Doctor',
      cancelButtonText: 'Cancel',
      size: 'medium',
      mode: 'create',
    };
  }

  private editConfig(): ModalConfig {
    return {
      title: 'Edit Doctor',
      submitButtonText: 'Save Changes',
      cancelButtonText: 'Cancel',
      size: 'medium',
      mode: 'edit',
    };
  }

  // ── Row actions
  onTableAction(event: RowActionEvent): void {
    const { action, rowData } = event;
    if (action === 'edit') this.handleOpenEdit(rowData);
    // if (action === 'view') this.openViewDoctor(rowData);
    // if (action === 'delete') this.deleteDoctor(rowData.id);  
  }
}