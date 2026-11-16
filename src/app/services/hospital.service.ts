import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor, Patient } from '../models/hospital.model';

@Injectable({ providedIn: 'root' })
export class HospitalService {
  private http = inject(HttpClient);
  private readonly api = 'http://localhost:3000';

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.api}/doctors`);
  }
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.api}/patients`);
  }
  addDoctor(data: Omit<Doctor, 'id'>): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.api}/doctors`, { ...data, id: crypto.randomUUID() });
  }
  updateDoctor(id: string, data: Omit<Doctor, 'id'>): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.api}/doctors/${id}`, { ...data, id });
  }
  deleteDoctor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/doctors/${id}`);
  }
  addPatient(data: Omit<Patient, 'id'>): Observable<Patient> {
    return this.http.post<Patient>(`${this.api}/patients`, { ...data, id: crypto.randomUUID() });
  }
  updatePatient(id: string, data: Omit<Patient, 'id'>): Observable<Patient> {
    return this.http.put<Patient>(`${this.api}/patients/${id}`, { ...data, id });
  }
  deletePatient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/patients/${id}`);
  }
}