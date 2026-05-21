import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import {
  AppointmentResponse,
  MedicalHistoryResponse,
  PatientResponse,
  MedicalHistoryRequest,
  UpdatePatientRequest,
} from '../../models/admin.model';
import {
  appointmentColumns,
  appointmentActions,
  reportActions,
  reportColumns,
} from './patient-details.config';
import { CommonModule, formatDate } from '@angular/common';
import { FormField, ModalConfig, ModalSubmitEvent } from '../../../../shared/models/form.models';
import { ModalFormComponent } from '../../../../shared/components/dialog-form/dialog-form.component';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'doctor-patient-details',
  standalone: true,
  imports: [CommonModule, ModalFormComponent, DataTableComponent],
  templateUrl: 'patient-details.component.html',
  styleUrls: ['patient-details.component.css'],
})
export class PatientDetails implements OnInit {
  patientId: number = 0;
  private readonly adminService = inject(AdminService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef); // ← ADDED

  patientDetails: PatientResponse | null = null;
  patientMedicalHistory: MedicalHistoryResponse[] = [];
  patientAppointmentHistory: AppointmentResponse[] = [];
  loading = false;
  error: string | null = null;
  isSubmitting = false;

  showUpdateModal = false;
  showAddReportModal = false;

  updateModalConfig: ModalConfig = {
    title: 'Update Patient Information',
    size: 'medium',
    mode: 'edit',
    submitButtonText: 'Update Patient',
    cancelButtonText: 'Cancel',
  };
  addReportModalConfig: ModalConfig = {
    title: 'Add Medical Report',
    size: 'medium',
    mode: 'create',
    submitButtonText: 'Add Report',
    cancelButtonText: 'Cancel',
  };

  updateFormFields: FormField[] = [];
  addReportFormFields: FormField[] = [];

  appointmentColumns = appointmentColumns;
  appointmentActions = appointmentActions;
  reportColumns = reportColumns;
  reportActions = reportActions;

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPatientDetails();
    this.loadMedicalHistory();
    this.loadAppointmentHistory();
    this.initializeFormFields();
  }

  private initializeFormFields(): void {
    this.updateFormFields = [
      {
        key: 'patientName',
        label: 'Patient Name',
        type: 'text',
        placeholder: 'Enter full name',
        required: true,
        value: '',
      },
      {
        key: 'patientEmail',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Enter email address',
        required: true,
        value: '',
      },
      {
        key: 'patientContactNo',
        label: 'Contact Number',
        type: 'number',
        placeholder: 'Enter Contact Number',
        required: true,
        value: '',
      },
      {
        key: 'patientGender',
        label: 'Gender',
        type: 'select',
        required: true,
        value: '',
        options: [
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' },
          { label: 'Other', value: 'Other' },
        ],
      },
      {
        key: 'patientAddress',
        label: 'Address',
        type: 'text',
        placeholder: 'Enter address',
        required: true,
        value: '',
      },
      {
        key: 'patientAge',
        label: 'Age',
        type: 'number',
        placeholder: 'Enter age',
        required: true,
        min: 0,
        max: 150,
        value: '',
      },
      {
        key: 'patientMedicalHistory',
        label: 'Medical History',
        type: 'textarea',
        placeholder: 'Enter medical history...',
        required: false,
        value: '',
        rows: 3,
      },
    ];
    this.addReportFormFields = [
      {
        key: 'bloodPressure',
        label: 'Blood Pressure',
        type: 'text',
        placeholder: 'e.g., 120/80',
        required: true,
        value: '',
      },
      {
        key: 'bloodSugar',
        label: 'Blood Sugar',
        type: 'text',
        placeholder: 'e.g., 100 mg/dL',
        required: true,
        value: '',
      },
      {
        key: 'weight',
        label: 'Weight',
        type: 'text',
        placeholder: 'e.g., 70 kg',
        required: true,
        value: '',
      },
      {
        key: 'temperature',
        label: 'Temperature',
        type: 'text',
        placeholder: 'e.g., 98.6°F',
        required: true,
        value: '',
      },
      {
        key: 'medicalPrescription',
        label: 'Medical Prescription',
        type: 'textarea',
        placeholder: 'Enter prescription...',
        required: true,
        value: '',
        rows: 4,
      },
    ];
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Data Loaders
  // ─────────────────────────────────────────────────────────────────────────

  loadPatientDetails(): void {
    this.loading = true;
    this.adminService.getPatientById(this.patientId).subscribe({
      next: (data) => {
        this.patientDetails = {
          ...data,
          creationDate: formatDate(data.creationDate, 'dd-MM-yyyy - HH:mm', 'en-US'),
          updationDate: data.updationDate
            ? formatDate(data.updationDate, 'dd-MM-yyyy - HH:mm', 'en-US')
            : 'N/A',
        };
        this.loading = false;
        this.cdr.detectChanges(); // ← ADDED
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to Load Patient Details';
        this.loading = false;
        this.cdr.detectChanges(); // ← ADDED
      },
    });
  }

  loadMedicalHistory(): void {
    this.adminService.getMedicalHistory(this.patientId).subscribe({
      next: (data) => {
        this.patientMedicalHistory = data;
        this.cdr.detectChanges(); // ← ADDED
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to Load Medical History';
        this.cdr.detectChanges(); // ← ADDED
      },
    });
  }

  loadAppointmentHistory(): void {
    this.adminService.getAppointmentHistory(this.patientId.toString()).subscribe({
      next: (data) => {
        this.patientAppointmentHistory = data;
        this.cdr.detectChanges(); // ← ADDED
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to Load Appointment History';
        this.cdr.detectChanges(); // ← ADDED
      },
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Update Modal
  // ─────────────────────────────────────────────────────────────────────────

  openUpdateModal(): void {
    this.updateFormFields = this.updateFormFields.map((f) => ({
      ...f,
      value: (this.patientDetails as any)?.[f.key] ?? '',
    }));
    this.showUpdateModal = true;
  }

  closeUpdateModal(): void {
    this.showUpdateModal = false;
  }

  onUpdateModalSubmit(event: ModalSubmitEvent): void {
    if (!event.isValid) return;
    this.isSubmitting = true;
    const req: UpdatePatientRequest = {
      patientName: event.formData['patientName'],
      patientContactNo: event.formData['patientContactNo'],
      patientEmail: event.formData['patientEmail'],
      patientGender: event.formData['patientGender'],
      patientAddress: event.formData['patientAddress'],
      patientAge: event.formData['patientAge'],
      patientMedicalHistory: event.formData['patientMedicalHistory'],
    };
    this.adminService.updatePatient(this.patientId, req).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.closeUpdateModal();
        this.loadPatientDetails();
        alert('Patient updated successfully!');
      },
      error: (e) => {
        this.isSubmitting = false;
        alert('Failed to update: ' + (e.error?.message || 'Unknown error'));
      },
    });
  }

  onUpdateModalCancelled(): void {
    this.closeUpdateModal();
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Add Report Modal
  // ─────────────────────────────────────────────────────────────────────────

  openAddReportModal(): void {
    this.addReportFormFields = this.addReportFormFields.map((f) => ({ ...f, value: '' }));
    this.showAddReportModal = true;
  }

  closeAddReportModal(): void {
    this.showAddReportModal = false;
  }

  onAddReportSubmit(event: ModalSubmitEvent): void {
    if (!event.isValid) return;
    this.isSubmitting = true;
    const req: MedicalHistoryRequest = {
      bloodPressure: event.formData['bloodPressure'],
      bloodSugar: event.formData['bloodSugar'],
      weight: event.formData['weight'],
      temperature: event.formData['temperature'],
      medicalPrescription: event.formData['medicalPrescription'],
    };
    this.adminService.addMedicalHistory(this.patientId, req).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.closeAddReportModal();
        this.loadMedicalHistory();
        alert('Report added successfully!');
      },
      error: (e) => {
        this.isSubmitting = false;
        alert('Failed: ' + (e.error?.message || 'Unknown error'));
      },
    });
  }

  onAddReportCancelled(): void {
    this.closeAddReportModal();
  }
}
