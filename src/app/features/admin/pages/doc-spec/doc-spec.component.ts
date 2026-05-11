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
  specializationModalData: Partial<SpecializationRequest> | null = null;
  editingId = signal<number | null>(null);

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

openAddSpecialization(): void {
  this.specializationModalData = null;   // clears form via ngOnChanges
  this.editingId.set(null);
  this.showSpecializationModal = true;
}

onSubmit(event: ModalSubmitEvent): void {
  if (!event.isValid) {
    alert('Please fill in all required fields.');
    return;
  }

  const id = this.editingId();
  if (id !== null) {
    this.editSpecialization(id, event.formData as SpecializationRequest);
  } else {
    this.addSpecialization(event.formData as SpecializationRequest);
  }
}

addSpecialization(request: SpecializationRequest): void {
  this.loading.set(true);
  this.adminSpecializationService.createSpecialization(request).subscribe({
    next: (newSpec) => {
      this.specializations.update((prev) => [...prev, newSpec]);
      this.loading.set(false);
      this.showSpecializationModal = false;
    },
    error: () => {
      this.error.set('Failed to Add Specialization');
      this.loading.set(false);
    },
  });
}

editSpecialization(id: number, request: SpecializationRequest): void {
  // this.loading.set(true);
  // this.adminSpecializationService.updateSpecialization(id, request).subscribe({
  //   next: (updated) => {
  //     // replace the item in the list instead of appending
  //     this.specializations.update((prev) =>
  //       prev.map((s) => (s.id === id ? updated : s))
  //     );
  //     this.loading.set(false);
  //     this.showSpecializationModal = false;
  //   },
  //   error: () => {
  //     this.error.set('Failed to Update Specialization');
  //     this.loading.set(false);
  //   },
  // });
}

onDocSpecTableAction(event: RowActionEvent): void {
  const { action, rowData } = event;
  if (action === 'edit') {
    this.editingId.set(rowData.id);
    this.specializationModalData = { ...rowData }; // pre-fills form
    this.showSpecializationModal = true;
  }
}

}