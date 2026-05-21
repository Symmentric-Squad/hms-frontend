import { Component, inject, signal, computed } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { RowActionEvent } from '../../../../shared/models/data-table.models';
import { PatientResponse } from '../../models/admin.model';
import { AdminService } from '../../service/admin.service';
import { patientActions, patientColumns } from './patient.config';
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
  searchTerm = signal<string>('');

  filteredPatients = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const allPatients = this.patients();
    if (!term) return allPatients;
    return allPatients.filter((patient) => patient.patientName?.toLowerCase().includes(term));
  });

  patientColumns = patientColumns;
  patientActions = patientActions;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  updateSearchTerm(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  loadPatients(): void {
    this.loading.set(true);
    this.error.set(null);
    this.adminService.getAllPatients().subscribe({
      next: (data) => { this.patients.set(data); this.loading.set(false); },
      error: () => { this.error.set('Failed to Load Patients'); this.loading.set(false); },
    });
  }

  onPatientTableAction(event: RowActionEvent): void {
    const { action, rowData } = event;
    if (action === 'view' && rowData.patientId) {
      this.router.navigate(['/admin/patient', rowData.patientId]);
    }
  }
}