import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { PublicService } from '../../../../core/services/public.service';
import { RowActionEvent, TableAction, TableColumn } from '../../../../shared/models/data-table.models';
import { FormField, ModalConfig, ModalSubmitEvent } from '../../../../shared/models/form.models';
import { MedicalHistoryRequest, MedicalHistoryResponse } from '../../models/admin.model';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-report-management',
  standalone: false,
  templateUrl: './report.component.html',
  styleUrl: '../../../../../styles.css'
})
export class AdminReportsPage {
  private readonly reportService = inject(PublicService);
  private readonly adminReportService = inject(AdminService);
  private readonly auth = inject(AuthService);

  reports = signal<MedicalHistoryResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadReports();
  }

  // ── Load ──────────────────────────────────────────────────────────────────
  loadReports(userId: number = 1): void {
    this.loading.set(true);
    this.error.set(null);

    this.reportService.getMedicalHistory(userId).subscribe({
      next: (data) => {
        this.reports.set(data);
        console.log(data)
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to Load Reports');
        this.loading.set(false);
      },
    });
  }

  // ── Add ──────────────────────────────────────────────────────────────────
    addMedicalHistory(patientId: number, request: MedicalHistoryRequest): void {
      this.loading.set(true);
  
      this.adminReportService.addMedicalHistory(patientId, request).subscribe({
        next: (newMedialHistory) => {
          this.reports.update((prev) => [...prev, newMedialHistory]);
          this.loading.set(false);
          this.showReportModal = false;
        },
        error: () => {
          this.error.set('Failed to Book Medical History');
          this.loading.set(false);
        },
      });
    }

  // Table Configuration
  reportColumns: TableColumn[] = [
    // { key: "patientName", label: "Patient Name" },
    { key: "bloodPressure", label: "Blood Pressure" },
    { key: "bloodSugar", label: "Blood Sugar" },
    { key: "weight", label: "Weight" },
    { key: "temperature", label: "Temperature" },
    { key: "medicalPrescription", label: "Medical Prescription" },
    { key: "creationDate", label: "Report Date" },
  ];

  reportActions: TableAction[] = [
    // { id: 'view',   label: 'View',   icon: 'eye.svg',   type: 'secondary', actionColor: 'gray' },
    // { id: 'edit',   label: 'Edit',   icon: 'edit.svg',  type: 'primary',   actionColor: 'blue' },
    // { id: 'delete', label: 'Delete', icon: 'trash.svg', type: 'danger',    actionColor: 'red'  },
  ];

  reportModalConfig: ModalConfig = {
    title: 'Add Report',
    submitButtonText: 'Save Report',
    cancelButtonText: 'Cancel',
    size: 'medium',
    mode: 'create',
  }

  reportModalFields: FormField[] = [
    { key: "bloodPressure", label: "bloodPressure",type: 'text',required: true },
    { key: "bloodSugar", label: "bloodSugar",type: 'number',required: true },
    { key: "weight", label: "weight",type: 'number',required: true },
    { key: "temperature", label: "temperature",type: 'number',required: true },
    { key: "medicalPrescription", label: "medicalPrescription",type: 'text',required: true }
  ]

  // ── Modal state ───────────────────────────────────────────────────────────
    showReportModal = false;
    editingAppointment: Partial<MedicalHistoryRequest> = {};
  
    openAddAppointment(): void {
      this.editingAppointment = {};
      this.showReportModal = true;
    }
  
    onSubmit(event: ModalSubmitEvent): void {
      if (!event.isValid) {
        alert('Please fill in all required fields.');
        return;
      }
      // TODO: fetch patientId from patient name
      this.addMedicalHistory(1,event.formData as MedicalHistoryRequest);
    }
  
    // ── Row actions ───────────────────────────────────────────────────────────
  onMedicalHistoryTableAction(event: RowActionEvent): void {
    const { action, rowData } = event;
    console.log(rowData)
    if (action === 'edit') {
      this.editingAppointment = { ...rowData };
      this.showReportModal = true;
    }
  }
}