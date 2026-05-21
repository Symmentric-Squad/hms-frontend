interface Doctor {
  id: number;
  name: string;
  speciality: string;
  phone: string;
  email: string;
  status: 'Active' | 'Inactive';
}