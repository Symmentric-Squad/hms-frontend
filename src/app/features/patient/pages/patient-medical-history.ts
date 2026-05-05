import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MedicalHistory {
  id: number;
  bloodPressure: string;
  bloodSugar: string;
  weight: string;
  temperature: string;
  medicalPrescription: string;
  createdOn: string;
  updatedOn: string;
}

@Component({
  selector: 'app-patient-medical-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="history-card">
      <h2>👥 Medical History</h2>
      <p>Past medical reports</p>

      <div class="table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Blood Pressure</th>
              <th>Blood Sugar</th>
              <th>Weight</th>
              <th>Temperature</th>
              <th>Prescription</th>
              <th>Created On</th>
              <th>Updated On</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let mh of medicalHistory; let i = index">
              <td>{{ i + 1 }}</td>
              <td>{{ mh.bloodPressure }}</td>
              <td>{{ mh.bloodSugar }}</td>
              <td>{{ mh.weight }}</td>
              <td>{{ mh.temperature }}</td>
              <td>{{ mh.medicalPrescription }}</td>
              <td>{{ mh.createdOn }}</td>
              <td>{{ mh.updatedOn }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .history-card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
      max-width: 1000px;
      margin: 0 auto;
    }

    .history-card h2 {
      font-size: 22px;
      font-weight: 700;
      color: #0d6efd;
      margin-bottom: 6px;
      text-align: center;
  margin-bottom: 20px;
    }

    .history-card p {
      color: #666;
margin-bottom: 6px;
      text-align: center;
      font-size: 14px;
      margin-bottom: 20px;
    }

    .table-card {
      overflow-x: auto;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th, .data-table td {
      padding: 10px;
      border-bottom: 1px solid #e0e0e0;
      text-align: left;
      font-size: 14px;
    }
  `]
})
export class PatientMedicalHistoryComponent {
  medicalHistory: MedicalHistory[] = [
    {
      id: 1,
      bloodPressure: '120/80',
      bloodSugar: '95 mg/dL',
      weight: '70 kg',
      temperature: '98.6°F',
      medicalPrescription: 'Vitamin D supplements',
      createdOn: '2026-03-15',
      updatedOn: '2026-04-10'
    },
    {
      id: 2,
      bloodPressure: '130/85',
      bloodSugar: '110 mg/dL',
      weight: '72 kg',
      temperature: '99°F',
      medicalPrescription: 'Low-salt diet',
      createdOn: '2026-02-05',
      updatedOn: '2026-03-01'
    }
  ];
}
