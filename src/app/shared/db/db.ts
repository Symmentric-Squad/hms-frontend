export const activeTab: 'dashboard' | 'doctors' | 'patients' | 'appointments' = 'dashboard';

  export const doctors: Doctor[] = [
    { id: 1, name: 'Dr. Arjun Mehta', specialty: 'Cardiology', phone: '+91 98765 11001', email: 'arjun.mehta@hospital.com', status: 'Active' },
    { id: 2, name: 'Dr. Priya Nair', specialty: 'Neurology', phone: '+91 98765 22002', email: 'priya.nair@hospital.com', status: 'Active' },
    { id: 3, name: 'Dr. Rajan Kumar', specialty: 'Orthopedics', phone: '+91 98765 33003', email: 'rajan.kumar@hospital.com', status: 'Inactive' },
    { id: 4, name: 'Dr. Shalini Rao', specialty: 'Pediatrics', phone: '+91 98765 44004', email: 'shalini.rao@hospital.com', status: 'Active' },
    { id: 5, name: 'Dr. Vikram Patel', specialty: 'ENT', phone: '+91 98765 55005', email: 'vikram.patel@hospital.com', status: 'Active' },
  ];

  export const patients: Patient[] = [
    { id: 1, name: 'Suresh Babu', age: 45, phone: '+91 90001 11111', bloodGroup: 'A+', doctor: 'Dr. Arjun Mehta', status: 'Active' },
    { id: 2, name: 'Kavitha Rajan', age: 32, phone: '+91 90002 22222', bloodGroup: 'B+', doctor: 'Dr. Priya Nair', status: 'Active' },
    { id: 3, name: 'Murugan S', age: 60, phone: '+91 90003 33333', bloodGroup: 'O-', doctor: 'Dr. Rajan Kumar', status: 'Discharged' },
    { id: 4, name: 'Deepa Krishnan', age: 28, phone: '+91 90004 44444', bloodGroup: 'AB+', doctor: 'Dr. Shalini Rao', status: 'Active' },
    { id: 5, name: 'Anand Velu', age: 52, phone: '+91 90005 55555', bloodGroup: 'A-', doctor: 'Dr. Vikram Patel', status: 'Active' },
  ];

  export const appointments: Appointment[] = [
    { id: 1, patient: 'Suresh Babu', doctor: 'Dr. Arjun Mehta', date: '2026-04-26', time: '09:00 AM', status: 'Scheduled' },
    { id: 2, patient: 'Kavitha Rajan', doctor: 'Dr. Priya Nair', date: '2026-04-26', time: '10:30 AM', status: 'Scheduled' },
    { id: 3, patient: 'Murugan S', doctor: 'Dr. Rajan Kumar', date: '2026-04-24', time: '02:00 PM', status: 'Completed' },
    { id: 4, patient: 'Deepa Krishnan', doctor: 'Dr. Shalini Rao', date: '2026-04-25', time: '11:00 AM', status: 'Completed' },
    { id: 5, patient: 'Anand Velu', doctor: 'Dr. Vikram Patel', date: '2026-04-27', time: '04:00 PM', status: 'Scheduled' },
    { id: 6, patient: 'Suresh Babu', doctor: 'Dr. Priya Nair', date: '2026-04-23', time: '09:30 AM', status: 'Cancelled' },
  ];