import { Component, inject, signal } from '@angular/core';
import { MedicalHistoryResponse } from '../../../../core/models/public.model';
import { AuthService } from '../../../../core/services/auth.service';
import { PublicService } from '../../../../core/services/public.service';
import { RowActionEvent, TableAction, TableColumn } from '../../../../shared/models/data-table.models';
import { FormField, ModalConfig, ModalSubmitEvent } from '../../../../shared/models/form.models';
import { MedicalHistoryRequest } from '../../../admin/models/admin.model';

@Component({
  selector: 'app-report-management',
  standalone: false,
  templateUrl: './report.component.html',
  styleUrl: '../../../../../styles.css'
})
export class PatientReportsPage {
  private readonly reportService = inject(PublicService);
  private readonly auth = inject(AuthService);

  reports = signal<MedicalHistoryResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadReports();
  }

  // ── Load 
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

  // Table Configuration
  reportColumns: TableColumn[] = [
    // { key: "patientName", label: "Patient Name" },
    { key: "bloodPressure", label: "Blood Pressure" },
    { key: "bloodSugar", label: "Blood Sugar" },
    { key: "weight", label: "Weight" },
    { key: "temperature", label: "Temperature" },
    { key: "medicalPrescription", label: "Medical Prescription" },
    // { key: "creationDate", label: "Report Date" },
  ];

  reportActions: TableAction[] = [
    // { id: 'view',   label: 'View',   icon: 'eye.svg',   type: 'secondary', actionColor: 'gray' },
    // { id: 'edit',   label: 'Edit',   icon: 'edit.svg',  type: 'primary',   actionColor: 'blue' },
    // { id: 'delete', label: 'Delete', icon: 'trash.svg', type: 'danger',    actionColor: 'red'  },
  ];

}