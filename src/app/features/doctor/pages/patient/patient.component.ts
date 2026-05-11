import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { RowActionEvent } from '../../../../shared/models/data-table.models';
import { ModalSubmitEvent } from '../../../../shared/models/form.models';
import { CreatePatientRequest, PatientResponse } from '../../models/doctor.model';
import { DoctorService } from '../../service/doctor.service';
import { patientActions, patientColumns, patientModalConfig, patientModalFields } from './patient.config';
import { Router } from '@angular/router';


@Component({
  selector: 'app-patient-management',
  standalone: false,
  templateUrl: './patient.component.html',
  styleUrl: '../../../../../styles.css',
})
export class DoctorPatientsPage {
  private readonly doctorPatientService = inject(DoctorService);
  private readonly auth = inject(AuthService);

  patients = signal<PatientResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadPatients();
  }

  constructor (private router: Router) {}

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
  patientColumns = patientColumns;
  patientActions = patientActions;
  patientModalConfig = patientModalConfig;
  patientModalFields = patientModalFields;

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

  switch (action) {
    case 'edit':
      this.editingPatient = { ...rowData };
      this.showPatientModal = true;
      break;

    case 'view':
      const patientId = rowData.patientId; 
      
      if (patientId) {
        this.router.navigate(['/doctor/patient', patientId]);
      } else {
        console.error('Patient ID is missing in rowData', rowData);
      }
      break;

    default:
      console.warn(`Unhandled action type: ${action}`);
  }
}
}