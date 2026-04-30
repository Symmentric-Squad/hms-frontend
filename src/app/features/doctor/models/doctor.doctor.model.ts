interface Doctor {
  id: number;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  status: 'Active' | 'Inactive';
}