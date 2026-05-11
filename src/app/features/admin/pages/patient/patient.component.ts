import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { RowActionEvent } from '../../../../shared/models/data-table.models';
import { ModalSubmitEvent } from '../../../../shared/models/form.models';
import { PatientResponse } from '../../models/admin.model';
import { AdminService } from '../../service/admin.service';
import { patientActions, patientColumns, patientModalConfig, patientModalFields } from './patient.config';
import { Router } from '@angular/router';


@Component({
  selector: 'app-patient-management',
  standalone: false,
  templateUrl: './patient.component.html',
  styleUrl: '../../../../../styles.css',
})
export class AdminPatientsPage {

  private readonly adminService = inject(AdminService);
  private readonly auth = inject(AuthService);

  patients = signal<PatientResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  patientColumns = patientColumns;
  patientActions = patientActions;
  patientModalConfig = patientModalConfig;
  patientModalFields = patientModalFields;

  constructor(private router:Router){}

  ngOnInit(): void {
    this.loadPatients();
  }

  // ── Load 
  loadPatients(userId: number = 1): void {
    this.loading.set(true);
    this.error.set(null);

    this.adminService.getAllPatients().subscribe({
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

  showPatientModal = false;
  editingPatient: Partial<PatientResponse> = {};
  isEditMode = false;

  openAddPatient(): void{
    this.editingPatient = {};
    this.showPatientModal = true;
  }

  onSubmit(event: ModalSubmitEvent): void {
    // console.log(event.formData)
    // if(!event.isValid){
    //   alert('Please fill in all required fields')
    //   return;
    // }
    // this.addPatient(event.formData as any);
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
        this.router.navigate(['/admin/patient', patientId]);
      } else {
        console.error('Patient ID is missing in rowData', rowData);
      }
      break;

    default:
      console.warn(`Unhandled action type: ${action}`);
  }
}
}