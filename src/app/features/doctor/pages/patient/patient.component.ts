import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { patients, doctors } from '../../../../shared/db/db';
import { RowActionEvent, TableAction, TableColumn } from '../../../../shared/models/data-table.models';
import { Router } from '@angular/router';
import { PublicService } from '../../../../core/services/public.service';
import { DoctorService } from '../../service/doctor.service';
import { AuthService } from '../../../../core/services/auth.service';
import { CreatePatientRequest, PatientResponse } from '../../models/doctor.model';
import { FormField, ModalConfig, ModalSubmitEvent } from '../../../../shared/models/form.models';


@Component({
  selector: 'app-patient-management',
  standalone: false,
  templateUrl: './patient.component.html',
  styleUrl: '../../../../../styles.css',
})
export class DoctorPatientsPage {

  private readonly patientService = inject(PublicService);
  private readonly doctorPatientService = inject(DoctorService);
  private readonly auth = inject(AuthService);

  patients = signal<PatientResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadPatients();
  }

  // ── Load 
  loadPatients(doctorId: number = 1): void {
    this.loading.set(true);
    this.error.set(null);

    this.doctorPatientService.getMyPatients(doctorId).subscribe({
      next: (data) => {
        this.patients.set(data);
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
  addPatient(request: CreatePatientRequest): void {
    this.loading.set(true);

    this.doctorPatientService.createPatient(request).subscribe({
      next: (newPatient) => {
        this.patients.update((prev) => [...prev, newPatient]);
        this.loading.set(false);
        this.showPatientModal = false;
      },
      error: () => {
        this.error.set('Failed to Add Patient');
        this.loading.set(false);
      },
    });
  }

  // Table Configuration
  patientColumns: TableColumn[] = [
    // { key: "doctorId", label: "Doctor Id" },
    { key: "patientName", label: "Patient Name" },
    { key: "patientContactNo", label: "Patient Contact No" },
    // { key: "patientEmail", label: "Patient Email" },
    { key: "patientGender", label: "Patient Gender" },
    // { key: "patientAddress", label: "Patient Address" },
    { key: "patientAge", label: "Patient Age" },
    { key: "patientMedicalHistory", label: "Patient Medical History" },
    // { key: "creationDate", label: "Creation Date" },
    // { key: "updationDate", label: "Updation Date" }

    // { key: 'name', label: 'Name' },
    // { key: 'age', label: 'Age' },
    // { key: 'phone', label: 'Phone' },
    // { key: 'bloodGroup', label: 'Blood Group' },
    // { key: 'doctor', label: 'Assigned Doctor' },
    // {
    //   key: 'status',
    //   label: 'Status',
    //   type: 'badge',
    //   tagColors: {
    //     'Admitted': { bg: '#d1fae5', text: '#065f46' },
    //     'Discharged': { bg: '#fef3c7', text: '#92400e' },
    //   },
    // },
  ];

  patientActions: TableAction[] = [
    // { id: 'view', label: 'View', icon: 'eye.svg', type: 'secondary', actionColor: 'gray' },
    // { id: 'edit', label: 'Edit', icon: 'edit.svg', type: 'primary', actionColor: 'blue'},
    // { id: 'delete', label: 'Delete', icon: 'trash.svg', type: 'danger', actionColor: 'red'}
  ];

  patientModalConfig: ModalConfig = {
    title: 'Add Patient',
    submitButtonText: 'Save Patient',
    cancelButtonText: 'Cancel',
    size: 'medium',
    mode: 'create',
  }

  patientModalFields: FormField[] = [
    { key: "fullName", label: "Full Name",type: 'text',required: true },
    { key: "email", label: "E Mail",type: 'email',required: true },
    { key: "password", label: "Password",type: 'text',required: true },
    { key: "gender", label: "Gender",type: 'text',required: true },
    { key: "address", label: "Address",type: 'text',required: true },
    { key: "city", label: "City",type: 'text',required: true }
  ]


  showPatientModal = false;
  editingPatient: Partial<PatientResponse> = {};
  isEditMode = false;

  openAddPatient(): void{
    this.editingPatient = {};
    this.showPatientModal = true;
  }

  onSubmit(event: ModalSubmitEvent): void {
    if(!event.isValid){
      alert('Please fill in all required fields')
      return;
    }
    this.addPatient(event.formData as CreatePatientRequest);
  }

  onPatientTableAction(event: RowActionEvent): void {
    const { action, rowData } = event;
    console.log(rowData)
    if (action === 'edit') {
      this.editingPatient = { ...rowData };
      this.showPatientModal = true;
    }
    // TODO: implement delete and view features
  }
}