


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AppointmentHistory {
  id: number;
  doctor: string;
  specialization: string;
  fee: string;
  date: string;
  time: string;
  createdOn: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

@Component({
  selector: 'app-patient-appointment-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="history-card">
      <h2>📋 Appointment History</h2>
      <p>Track all past and current appointments</p>

      <div class="table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Consultancy Fee</th>
              <th>Appointment Date/Time</th>
              <th>Created On</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let ah of appointmentHistory; let i = index">
              <td>{{ i + 1 }}</td>
              <td>{{ ah.doctor }}</td>
              <td>{{ ah.specialization }}</td>
              <td>{{ ah.fee }}</td>
              <td>{{ ah.date }} {{ ah.time }}</td>
              <td>{{ ah.createdOn }}</td>
              <td>
                <span class="status-badge" [class]="'status-' + ah.status.toLowerCase()">
                  {{ ah.status }}
                </span>
              </td>
              <td>
                <button class="del-btn" (click)="cancelAppointment(i)">Cancel</button>
              </td>
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
      margin-bottom: 20px;
      text-align: center;
  margin-bottom: 20px4gj
    }

    .history-card p {
       font-size: 14px;
  color: #555;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 6px;
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

    .status-badge {
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      color: white;
    }

    .status-scheduled {
      background: #0d6efd;
    }

    .status-completed {
      background: #198754;
    }

    .status-cancelled {
      background: #dc3545;
    }

    .del-btn {
      background: #dc3545;
      color: white;
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .del-btn:hover {
      background: #bb2d3b;
    }
  `]
})
export class PatientAppointmentHistoryComponent {
  appointmentHistory: AppointmentHistory[] = [
    { id: 1, doctor: 'Dr. Arjun Mehta', specialization: 'Cardiology', fee: '₹500', date: '2026-05-10', time: '10:00 AM', createdOn: '2026-05-01', status: 'Scheduled' },
    { id: 2, doctor: 'Dr. Priya Nair', specialization: 'Neurology', fee: '₹600', date: '2026-04-28', time: '02:30 PM', createdOn: '2026-04-20', status: 'Completed' },
    { id: 3, doctor: 'Dr. Rajan Kumar', specialization: 'Orthopedics', fee: '₹450', date: '2026-04-25', time: '11:00 AM', createdOn: '2026-04-15', status: 'Cancelled' }
  ];

  cancelAppointment(index: number) {
    this.appointmentHistory[index].status = 'Cancelled';
    alert(`Appointment with ${this.appointmentHistory[index].doctor} has been cancelled.`);
  }
}
