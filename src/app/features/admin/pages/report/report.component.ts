import { Component } from '@angular/core';
import { patients, reports } from '../../../../shared/db/db';
import { RowActionEvent, TableAction, TableColumn } from '../../../../shared/models/data-table.models';
import { PatientReport } from '../../../doctor/models/report.doctor.model';

@Component({
  selector: 'app-report-management',
  standalone: false,
  templateUrl: './report.component.html',
  styleUrl: '../../../../../styles.css'
})
export class AdminReportsPage {
  reports = reports;
  patients = patients;

  // Table Configuration
  reportColumns: TableColumn[] = [
    { key: 'patientName', label: 'Patient Name' },
    { key: 'bloodPressure', label: 'Blood Pressure' },
    { key: 'weight', label: 'Weight (kg)' },
    { key: 'bloodSugar', label: 'Blood Sugar (mg/dL)' },
    { key: 'bodyTemp', label: 'Body Temp (°C)' },
    { key: 'medicalPrescription', label: 'Medical Prescription' },
    { key: 'reportDate', label: 'Report Date' },
  ];

  reportActions: TableAction[] = [
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

  showReportModal = false;
  editingReport: Partial<PatientReport> = {};
  isEditMode = false;
  isViewMode = false;

  get patientNames(): string[] {
    return this.patients.map(p => p.name);
  }

  openAddReport() {
    this.editingReport = { reportDate: this.getTodayDate() };
    this.isEditMode = false;
    this.isViewMode = false;
    this.showReportModal = true;
  }

  openEditReport(r: PatientReport) {
    this.editingReport = { ...r };
    this.isEditMode = true;
    this.isViewMode = false;
    this.showReportModal = true;
  }

  openViewReport(r: PatientReport) {
    this.editingReport = { ...r };
    this.isEditMode = false;
    this.isViewMode = true;
    this.showReportModal = true;
  }

  saveReport() {
    if (this.isEditMode) {
      const idx = this.reports.findIndex(r => r.id === this.editingReport.id);
      if (idx > -1) {
        this.reports[idx] = { ...this.reports[idx], ...this.editingReport } as PatientReport;
      }
    } else {
      this.reports.push({ ...this.editingReport, id: Date.now() } as PatientReport);
    }
    this.showReportModal = false;
  }

  deleteReport(id: number) {
    if (confirm('Delete this report?')) {
      this.reports = this.reports.filter(r => r.id !== id);
    }
  }

  // Handle table actions
  onTableAction(event: RowActionEvent): void {
    const { action, rowData } = event;

    if (action === 'view') {
      this.openViewReport(rowData);
    } else if (action === 'edit') {
      this.openEditReport(rowData);
    } else if (action === 'delete') {
      this.deleteReport(rowData.id);
    }
  }

  private getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}