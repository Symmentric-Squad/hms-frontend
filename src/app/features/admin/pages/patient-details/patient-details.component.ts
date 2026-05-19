import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminService } from "../../service/admin.service";
import { AppointmentResponse, MedicalHistoryResponse, PatientResponse, MedicalHistoryRequest, UpdateUserRequest } from "../../models/admin.model";
import { appointmentColumns, appointmentActions, reportActions, reportColumns } from "./patient-details.config"
import { formatDate } from "@angular/common";
import { FormField, ModalConfig, ModalSubmitEvent } from "../../../../shared/models/form.models";

@Component({
    selector: 'doctor-patient-details',
    standalone: false,
    templateUrl: 'patient-details.component.html',
    styleUrls: ['patient-details.component.css']
})
export class PatientDetails implements OnInit {
    patientId: number = 0;

    private readonly adminService = inject(AdminService);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);

    // Data - simple properties
    patientDetails: PatientResponse | null = null;
    patientMedicalHistory: MedicalHistoryResponse[] = [];
    patientAppointmentHistory: AppointmentResponse[] = [];

    loading = false;
    error: string | null = null;
    isSubmitting = false;

    // Modal states
    showUpdateModal = false;
    showAddReportModal = false;
    showDeleteConfirmation = false;

    // Modal configs
    updateModalConfig: ModalConfig = {
        title: 'Update User Information',
        size: 'medium',
        mode: 'edit',
        submitButtonText: 'Update User',
        cancelButtonText: 'Cancel'
    };

    addReportModalConfig: ModalConfig = {
        title: 'Add Medical Report',
        size: 'medium',
        mode: 'create',
        submitButtonText: 'Add Report',
        cancelButtonText: 'Cancel'
    };

    // Form fields
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

    // ── Initialize Form Fields ──────────────────────────────────────────
    private initializeFormFields(): void {
        this.updateFormFields = [
            {
                key: 'fullName',
                label: 'Full Name',
                type: 'text',
                placeholder: 'Enter full name',
                required: true,
                value: ''
            },
            {
                key: 'email',
                label: 'Email Address',
                type: 'email',
                placeholder: 'Enter email address',
                required: true,
                disabled: true,
                value: ''
            },
            {
                key: 'patientAge',
                label: 'Age',
                type: 'number',
                placeholder: 'Enter age',
                required: true,
                value: ''
            },
            {
                key: 'patientContactNo',
                label: 'Contact number',
                type: 'number',
                placeholder: 'Enter Contact Number',
                required: true,
                value: ''
            },
            {
                key: 'patientGender',
                label: 'Gender',
                type: 'text',
                placeholder: 'Gender',
                required: true,
                value: '',
            },
            {
                key: 'password',
                label: 'Password (Leave empty to keep current)',
                type: 'text',
                placeholder: 'Enter new password',
                required: false,
                value: ''
            }
        ];

        this.addReportFormFields = [
            {
                key: 'bloodPressure',
                label: 'Blood Pressure',
                type: 'text',
                placeholder: 'e.g., 120/80',
                required: true,
                value: ''
            },
            {
                key: 'bloodSugar',
                label: 'Blood Sugar',
                type: 'text',
                placeholder: 'e.g., 100 mg/dL',
                required: true,
                value: ''
            },
            {
                key: 'weight',
                label: 'Weight',
                type: 'text',
                placeholder: 'e.g., 70 kg',
                required: true,
                value: ''
            },
            {
                key: 'temperature',
                label: 'Temperature',
                type: 'text',
                placeholder: 'e.g., 98.6°F',
                required: true,
                value: ''
            },
            {
                key: 'medicalPrescription',
                label: 'Medical Prescription',
                type: 'textarea',
                placeholder: 'Enter medical prescription or notes...',
                required: true,
                value: '',
                rows: 4
            }
        ];
    }

    // ── Data Loading ────────────────────────────────────────────────────
    loadPatientDetails() {
        this.loading = true;
        this.error = null;

        this.adminService.getPatientById(this.patientId).subscribe({
            next: (data) => {
                const formattedData = {
                    ...data,
                    creationDate: formatDate(data.creationDate, 'dd-MM-yyyy - HH:mm', 'en-US'),
                    updationDate: data.updationDate
                        ? formatDate(data.updationDate, 'dd-MM-yyyy - HH:mm', 'en-US')
                        : 'N/A'
                };
                this.patientDetails = formattedData;
                console.log(formattedData);
                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                this.error = 'Failed to Load Patient Details';
                this.loading = false;
            },
        });
    }

    loadMedicalHistory() {
        this.loading = true;
        this.error = null;

        this.adminService.getMedicalHistory(this.patientId).subscribe({
            next: (data) => {
                this.patientMedicalHistory = data;
                console.log(data);
                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                this.error = 'Failed to Load Medical History';
                this.loading = false;
            },
        });
    }

    loadAppointmentHistory() {
        this.loading = true;
        this.error = null;

        this.adminService.getAppointmentHistory(this.patientId.toString()).subscribe({
            next: (data) => {
                this.patientAppointmentHistory = data;
                console.log(data);
                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                this.error = 'Failed to Load Appointment History';
                this.loading = false;
            },
        });
    }

    // ── Update User Modal ────────────────────────────────────────────────
    openUpdateModal(): void {
        // Update form fields with current patient data
        this.updateFormFields = this.updateFormFields.map(field => ({
            ...field,
            value: this.getFieldValue(field.key)
        }));
        this.showUpdateModal = true;
    }

    closeUpdateModal(): void {
        this.showUpdateModal = false;
    }

    onUpdateModalSubmit(event: ModalSubmitEvent): void {
        if (!event.isValid) return;

        this.isSubmitting = true;
        const formValue = event.formData;

        const updateRequest: UpdateUserRequest = {
            fullName: formValue["fullName"],
            address: formValue["address"],
            city: formValue["city"],
            gender: formValue["gender"],
            ...(formValue["password"] && { password: formValue["password"] })
        };

        this.adminService.updateUser(this.patientId, updateRequest).subscribe({
            next: (response) => {
                console.log('User updated successfully', response);
                this.isSubmitting = false;
                this.closeUpdateModal();
                this.loadPatientDetails();
                alert('User updated successfully!');
            },
            error: (error) => {
                console.error('Failed to update user', error);
                this.isSubmitting = false;
                this.error = 'Failed to update user. Please try again.';
                alert('Failed to update user: ' + (error.error?.message || 'Unknown error'));
            }
        });
    }

    onUpdateModalCancelled(): void {
        this.closeUpdateModal();
    }

    // ── Add Medical Report Modal ────────────────────────────────────────
    openAddReportModal(): void {
        // Reset form fields
        this.addReportFormFields = this.addReportFormFields.map(field => ({
            ...field,
            value: ''
        }));
        this.showAddReportModal = true;
    }

    closeAddReportModal(): void {
        this.showAddReportModal = false;
    }

    onAddReportSubmit(event: ModalSubmitEvent): void {
        if (!event.isValid) return;

        this.isSubmitting = true;
        const medicalHistoryRequest: MedicalHistoryRequest = {
            bloodPressure: event.formData["bloodPressure"],
            bloodSugar: event.formData["bloodSugar"],
            weight: event.formData["weight"],
            temperature: event.formData["temperature"],
            medicalPrescription: event.formData["medicalPrescription"]
        };

        this.adminService.addMedicalHistory(this.patientId, medicalHistoryRequest).subscribe({
            next: (response) => {
                console.log('Medical report added successfully', response);
                this.isSubmitting = false;
                this.closeAddReportModal();
                this.loadMedicalHistory();
                alert('Medical report added successfully!');
            },
            error: (error) => {
                console.error('Failed to add medical report', error);
                this.isSubmitting = false;
                this.error = 'Failed to add medical report. Please try again.';
                alert('Failed to add report: ' + (error.error?.message || 'Unknown error'));
            }
        });
    }

    onAddReportCancelled(): void {
        this.closeAddReportModal();
    }

    // ── Delete User ──────────────────────────────────────────────────────
    openDeleteConfirmation(): void {
        this.showDeleteConfirmation = true;
    }

    closeDeleteConfirmation(): void {
        this.showDeleteConfirmation = false;
    }

    confirmDelete(): void {
        this.isSubmitting = true;

        this.adminService.deleteUser(this.patientId).subscribe({
            next: (response) => {
                console.log('User deleted successfully', response);
                this.isSubmitting = false;
                this.closeDeleteConfirmation();
                alert('User deleted successfully!');
                this.router.navigate(['/admin/patients']);
            },
            error: (error) => {
                console.error('Failed to delete user', error);
                this.isSubmitting = false;
                this.error = 'Failed to delete user. Please try again.';
                alert('Failed to delete user: ' + (error.error?.message || 'Unknown error'));
            }
        });
    }

    // ── Helper Methods ──────────────────────────────────────────────────
    private getFieldValue(fieldKey: string): any {
        if (!this.patientDetails) return '';
        
        const fieldMap: Record<string, any> = {
            'fullName': this.patientDetails.patientName,
            'email': this.patientDetails.patientEmail,
            'address': this.patientDetails.patientAddress,
            'city': this.patientDetails.patientId || '',
            'gender': this.patientDetails.patientGender,
            'password': ''
        };

        return fieldMap[fieldKey] || '';
    }
}