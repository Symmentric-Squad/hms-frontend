import { PatientReport } from "../../features/doctor/models/report.doctor.model";

export const activeTab: 'dashboard' | 'doctors' | 'patients' | 'appointments' = 'dashboard';

  export const doctors: Doctor[] = [
    { id: 1, name: 'Arjun Mehta', speciality: 'Cardiology', phone: '+91 98765 11001', email: 'arjun.mehta@hospital.com', status: 'Active' },
    { id: 2, name: 'Priya Nair', speciality: 'Neurology', phone: '+91 98765 22002', email: 'priya.nair@hospital.com', status: 'Active' },
    { id: 3, name: 'Rajan Kumar', speciality: 'Orthopedics', phone: '+91 98765 33003', email: 'rajan.kumar@hospital.com', status: 'Inactive' },
    { id: 4, name: 'Shalini Rao', speciality: 'Pediatrics', phone: '+91 98765 44004', email: 'shalini.rao@hospital.com', status: 'Active' },
    { id: 5, name: 'Vikram Patel', speciality: 'ENT', phone: '+91 98765 55005', email: 'vikram.patel@hospital.com', status: 'Active' },
  ];

  export const patients: Patient[] = [
    { id: 1, name: 'Suresh Babu', age: 45, phone: '+91 90001 11111', bloodGroup: 'A+', doctor: 'Dr. Arjun Mehta', status: 'Admitted' },
    { id: 2, name: 'Kavitha Rajan', age: 32, phone: '+91 90002 22222', bloodGroup: 'B+', doctor: 'Dr. Priya Nair', status: 'Admitted' },
    { id: 3, name: 'Murugan S', age: 60, phone: '+91 90003 33333', bloodGroup: 'O-', doctor: 'Dr. Rajan Kumar', status: 'Discharged' },
    { id: 4, name: 'Deepa Krishnan', age: 28, phone: '+91 90004 44444', bloodGroup: 'AB+', doctor: 'Dr. Shalini Rao', status: 'Admitted' },
    { id: 5, name: 'Anand Velu', age: 52, phone: '+91 90005 55555', bloodGroup: 'A-', doctor: 'Dr. Vikram Patel', status: 'Admitted' },
  ];

  export const appointments: Appointment[] = [
    { id: 1, patient: 'Suresh Babu', doctor: 'Dr. Arjun Mehta', date: '2026-04-26', time: '09:00 AM', status: 'Scheduled' },
    { id: 2, patient: 'Kavitha Rajan', doctor: 'Dr. Priya Nair', date: '2026-04-26', time: '10:30 AM', status: 'Scheduled' },
    { id: 3, patient: 'Murugan S', doctor: 'Dr. Rajan Kumar', date: '2026-04-24', time: '02:00 PM', status: 'Completed' },
    { id: 4, patient: 'Deepa Krishnan', doctor: 'Dr. Shalini Rao', date: '2026-04-25', time: '11:00 AM', status: 'Completed' },
    { id: 5, patient: 'Anand Velu', doctor: 'Dr. Vikram Patel', date: '2026-04-27', time: '04:00 PM', status: 'Scheduled' },
    { id: 6, patient: 'Suresh Babu', doctor: 'Dr. Priya Nair', date: '2026-04-23', time: '09:30 AM', status: 'Cancelled' },
  ];

  export const reports: PatientReport[] = [
    { id: 1, patientName: 'Suresh Babu', bloodPressure: '120/80', weight: 75, bloodSugar: 120, bodyTemp: 37, medicalPrescription: 'Medication A, Lifestyle changes', reportDate: '2026-04-20' },
    { id: 2, patientName: 'Kavitha Rajan', bloodPressure: '110/70', weight: 68, bloodSugar: 100, bodyTemp: 36.5, medicalPrescription: 'Medication B, Avoid triggers', reportDate: '2026-04-22' },
    { id: 3, patientName: 'Murugan S', bloodPressure: 'Dr. Rajan Kumar', weight: 80, bloodSugar: 110, bodyTemp: 37.5, medicalPrescription: 'Medication C, Physical therapy', reportDate: '2026-04-18' },
    { id: 4, patientName: 'Deepa Krishnan', bloodPressure: 'Dr. Shalini Rao', weight: 65, bloodSugar: 95, bodyTemp: 36, medicalPrescription: 'Inhaler, Avoid allergens', reportDate: '2026-04-21' },
    { id: 5, patientName: 'Anand Velu', bloodPressure: 'Dr. Vikram Patel', weight: 70, bloodSugar: 105, bodyTemp: 37, medicalPrescription: 'Medication D, Nasal spray', reportDate: '2026-04-19' },
  ];

  
export interface Specialisation{
    id:number;
    specialization: string;
    creationDate: string;
    updationDate: string;
}

  export const specialisations: Specialisation[] = [
    {id: 1,specialization: "Cardiology",creationDate: new Date().toISOString(),updationDate: new Date().toISOString()},
    {id: 2,specialization: "Neurology",creationDate: new Date().toISOString(),updationDate: new Date().toISOString()},
    {id: 3,specialization: "Orthopedics",creationDate: new Date().toISOString(),updationDate: new Date().toISOString()},
    {id: 4,specialization: "Pediatrics",creationDate: new Date().toISOString(),updationDate: new Date().toISOString()},
    {id: 5,specialization: "Cardiology",creationDate: new Date().toISOString(),updationDate: new Date().toISOString()}
  ]