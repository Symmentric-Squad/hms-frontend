import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { PublicService } from '../../../../core/services/public.service';
import { RowActionEvent, TableAction, TableColumn } from '../../../../shared/models/data-table.models';
import { FormField, ModalConfig, ModalSubmitEvent } from '../../../../shared/models/form.models';
import { CreatePatientRequest, PatientResponse } from '../../models/admin.model';
import { AdminService } from '../../service/admin.service';


@Component({
  selector: 'app-patient-management',
  standalone: false,
  templateUrl: './patient.component.html',
  styleUrl: '../../../../../styles.css',
})
export class AdminPatientsPage {

  private readonly patientService = inject(PublicService);
  private readonly adminPatientService = inject(AdminService);
  private readonly auth = inject(AuthService);

  patients = signal<PatientResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadPatients();
  }

  // ── Load ──────────────────────────────────────────────────────────────────
  loadPatients(userId: number = 1): void {
    this.loading.set(true);
    this.error.set(null);

    this.adminPatientService.getAllPatients().subscribe({
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

  // ── Add ──────────────────────────────────────────────────────────────────
  addPatient(request: CreatePatientRequest): void {
    this.loading.set(true);

    this.adminPatientService.createPatient(request).subscribe({
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
    { key: "doctorId", label: "Doctor Id" },
    { key: "patientName", label: "Patient Name" },
    // { key: "patientContactNo", label: "Patient Contact No" },
    // { key: "patientEmail", label: "Patient Email" },
    // { key: "patientGender", label: "Patient Gender" },
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
    { id: 'view', label: 'View', icon: 'eye.svg', type: 'secondary', actionColor: 'gray' },
    { id: 'edit', label: 'Edit', icon: 'edit.svg', type: 'primary', actionColor: 'blue'},
    { id: 'delete', label: 'Delete', icon: 'trash.svg', type: 'danger', actionColor: 'red'}
  ];

  patientModalConfig: ModalConfig = {
    title: 'Add Patient',
    submitButtonText: 'Save Patient',
    cancelButtonText: 'Cancel',
    size: 'medium',
    mode: 'create',
  }

  patientModalFields: FormField[] = [
    { key: "fullName", label: "fullName",type: 'text',required: true },
    { key: "email", label: "email",type: 'email',required: true },
    { key: "password", label: "password",type: 'text',required: true },
    { key: "gender", label: "gender",type: 'text',required: true },
    { key: "address", label: "address",type: 'text',required: true },
    { key: "city", label: "city",type: 'text',required: true }
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