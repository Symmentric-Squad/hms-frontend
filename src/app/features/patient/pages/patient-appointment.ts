import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-book-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="appointment-card">
      <h2>📅 Book Appointment</h2>
      <p>Please fill in the details to schedule your appointment</p>

      <form (ngSubmit)="bookAppointment()" #appointmentForm="ngForm">
        

        <div class="form-field">
          <label>Doctor Name</label>
          <select [(ngModel)]="appointment.doctorName" name="doctorName" required>
            <option value="" disabled>Select doctor</option>
            <option *ngFor="let doc of doctors" [value]="doc">{{ doc }}</option>
          </select>
        </div>

        <div class="form-field">
          <label>Specialization</label>
          <select [(ngModel)]="appointment.specialization" name="specialization" required>
            <option value="" disabled>Select specialization</option>
            <option *ngFor="let spec of specializations" [value]="spec">{{ spec }}</option>
          </select>
        </div>

        <div class="form-field">
          <label>Consultancy Fee</label>
          <input type="number" [(ngModel)]="appointment.consultancyFees" name="consultancyFees" required min="1" />
        </div>

        <div class="form-field">
          <label>Appointment Date</label>
          <input type="date" [(ngModel)]="appointment.appointmentDate" name="appointmentDate" required />
        </div>

        <div class="form-field">
          <label>Appointment Time</label>
          <select [(ngModel)]="appointment.appointmentTime" name="appointmentTime" required>
            <option value="" disabled>Select time slot</option>
            <option *ngFor="let slot of timeSlots" [value]="slot">{{ slot }}</option>
          </select>
        </div>

        <button type="submit" class="book-btn">Book Appointment</button>
      </form>
    </div>
  `,
  styles: [`
    .appointment-card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
      max-width: 600px;
      margin: 0 auto;
    }
    .form-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
    .form-field input, .form-field select {
      padding: 10px 14px;
      border: 1.5px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
    }
      h2{
      font-size: 24px;
  font-weight: 700;
  color: #0d6efd; /* accent blue */
  margin: 0;
  text-align: center;
  margin-bottom: 20px;
  }
  p{
  font-size: 14px;
  color: #555;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 6px;
  }
    .book-btn {
      background: linear-gradient(90deg, #0d6efd, #0a58ca);
      color: white;
      padding: 10px 18px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
  `]
})
export class PatientBookAppointmentComponent {
  // Doctor dropdown list
  doctors = ['Dr. Arjun Mehta', 'Dr. Priya Nair', 'Dr. Rajan Kumar', 'Dr. Kavitha Rajan'];

  // Specialization dropdown list
  specializations = ['Cardiology', 'Neurology', 'Orthopedics', 'Dermatology'];

  timeSlots: string[] = [];

  appointment = {
    userId: this.generateUserId(),
    doctorName: '',
    specialization: '',
    consultancyFees: null,
    appointmentDate: '',
    appointmentTime: ''
  };

  constructor() {
    this.generateTimeSlots();
  }

  generateUserId(): string {
    return 'U' + Math.floor(Math.random() * 1000000); // random ID like U123456
  }

  generateTimeSlots() {
    const slots: string[] = [];
    for (let hour = 9; hour <= 17; hour++) { // 9 AM to 5 PM
      slots.push(this.formatTime(hour, 0));
      slots.push(this.formatTime(hour, 30));
    }
    this.timeSlots = slots;
  }

  formatTime(hour: number, minute: number): string {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const displayMinute = minute === 0 ? '00' : minute.toString();
    return `${displayHour}:${displayMinute} ${ampm}`;
  }

  bookAppointment() {
    console.log('Appointment booked:', this.appointment);
    alert(`Appointment booked with ${this.appointment.doctorName} (${this.appointment.specialization}) on ${this.appointment.appointmentDate} at ${this.appointment.appointmentTime}. Fee: ${this.appointment.consultancyFees}`);
    // Later: call backend API here
  }
}
