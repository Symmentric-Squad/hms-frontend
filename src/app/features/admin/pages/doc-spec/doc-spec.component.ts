import { Component, inject, signal } from "@angular/core";
import { SpecializationRequest, SpecializationResponse } from "../../models/admin.model";
import { AdminService } from "../../service/admin.service";
import { AuthService } from "../../../../core/services/auth.service";
import { RowActionEvent, TableAction, TableColumn } from "../../../../shared/models/data-table.models";
import { FormField, ModalConfig, ModalSubmitEvent } from "../../../../shared/models/form.models";
import { formatDate } from "@angular/common";
import { specializationActions, specializationColumns, specializationModalConfig, specializationModalFields } from "./doc-spec.config";

@Component({
  selector: 'app-admin-doc-spec',
  styleUrl: "../../../../../styles.css",
  standalone: false,
  templateUrl: './doc-spec.component.html'
})

export class AdminSpecialisationPage {

  private readonly adminSpecializationService = inject(AdminService);
  private readonly auth = inject(AuthService);

  specializations = signal<SpecializationResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  
  specializationColumns = specializationColumns;
  specializationActions = specializationActions;
  specializationModalConfig = specializationModalConfig;
  specializationModalFields = specializationModalFields;
  
  ngOnInit(): void {
    this.loadSpecialization();
  }
  
  showSpecializationModal = false;
  specializationModalData: Partial<SpecializationRequest> = {};
  isEditMode = signal(false);

  // ── Load 
  loadSpecialization(): void {
    this.loading.set(true);
    this.error.set(null);

    this.adminSpecializationService.getAllSpecializations().subscribe({
      next: (data) => {
        const formattedData = data.map(apt => ({
          ...apt,
          creationDate: formatDate(apt.creationDate, 'dd-MM-yyyy - HH:mm', 'en-US'),
          // creationDate: new Date(apt.creationDate).toLocaleDateString(),

          updationDate: apt.updationDate
            ? formatDate(apt.updationDate, 'dd-MM-yyyy - HH:mm', 'en-US')
            : 'N/A'
          // updationDate: new Date(apt.updationDate).toLocaleDateString(),
        }));
        this.specializations.set(formattedData);
        console.log(formattedData)
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to Load specialization');
        this.loading.set(false);
      },
    });
  }

  // ── Book 
  addSpecialization(request: SpecializationRequest): void {
    this.loading.set(true);

    this.adminSpecializationService.createSpecialization(request).subscribe({
      next: (newSpecialization) => {
        this.specializations.update((prev) => [...prev, newSpecialization]);
        this.loading.set(false);
        this.showSpecializationModal = false;
      },
      error: () => {
        this.error.set('Failed to Book Appointment');
        this.loading.set(false);
      },
    });
  }

  // ── Edit
  editspecialization(id: number = 1, request: SpecializationRequest){
    this.loading.set(true);
    this.adminSpecializationService.updateSpecialization(id,request).subscribe({
      next: (newSpecialization) => {
        this.specializations.update((prev) => [...prev, newSpecialization]);
        this.loading.set(false);
        this.showSpecializationModal = false;
      },
      error: () => {
        this.error.set('Failed to Book Appointment');
        this.loading.set(false);
      },
    });
  }

  // ── Modal state

  openAddSpecialization(): void {
    this.specializationModalData = {};
    this.showSpecializationModal = true;
  }

  onSubmit(event: ModalSubmitEvent): void {
    if (!event.isValid) {
      alert('Please fill in all required fields.');
      return;
    }

    // if(this.isEditMode()){
    //   this.editspecialization(event.formData as SpecializationRequest);
    // }

    this.addSpecialization(event.formData as SpecializationRequest);
  }

  // ── Row actions
  onDocSpecTableAction(event: RowActionEvent): void {
    const { action, rowData } = event;
    console.log(rowData)
    if (action === 'edit') {
      this.specializationModalData = { ...rowData };
      this.isEditMode.set(true);
      this.showSpecializationModal = true;
    }
  }

}