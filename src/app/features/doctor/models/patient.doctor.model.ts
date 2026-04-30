interface Patient {
  id: number;
  name: string;
  age: number;
  phone: string;
  bloodGroup: string;
  doctor: string;
  status: 'Active' | 'Discharged';
}