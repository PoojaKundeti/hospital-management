export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
}
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  disease: string;
  doctorId: string;
  email: string;
}
export type EntityType = 'doctors' | 'patients';