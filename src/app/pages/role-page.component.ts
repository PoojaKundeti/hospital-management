import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HospitalService } from '../services/hospital.service';
import { DataTableComponent } from '../shared/data-table.component';
import { ActionButtonComponent } from '../shared/action-button.component';
import { Doctor, Patient, EntityType } from '../models/hospital.model';

@Component({
  selector: 'app-role-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DataTableComponent, ActionButtonComponent],
  templateUrl: './role-page.component.html',
  styleUrl: './role-page.component.css'

})
export class RolePageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(HospitalService);
  private fb = inject(FormBuilder);

  role = '';
  entity: EntityType = 'doctors';
  editable = false;
  records: Record<string, any>[] = [];
  doctors: Doctor[] = [];
  columns: {key:string;label:string}[] = [];
  searchText = '';
  showForm = false;
  editingId: string | null = null;
  errorMessage = '';
  successMessage = '';
  formError = '';

  recordForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    specialization: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
    age: [18, [Validators.required, Validators.min(1), Validators.max(120)]],
    gender: ['Male', Validators.required],
    disease: [''],
    doctorId: ['']
  });

  get description(): string {
    return this.editable ? 'Create, update and maintain hospital records.' : 'Browse hospital records in read-only mode.';
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.role = String(data['role']);
      this.entity = data['entity'] as EntityType;
      this.editable = Boolean(data['editable']);
      this.columns = this.entity === 'doctors'
        ? [{key:'name',label:'Doctor'},{key:'specialization',label:'Specialization'},{key:'email',label:'Email'},{key:'phone',label:'Phone'}]
        : [{key:'name',label:'Patient'},{key:'age',label:'Age'},{key:'gender',label:'Gender'},{key:'disease',label:'Condition'},{key:'email',label:'Email'}];
      this.loadRecords();
    });
    this.api.getDoctors().subscribe({ next: list => this.doctors = list, error: () => {} });
  }

  loadRecords(): void {
    this.errorMessage = '';
    const request: Observable<any[]> = this.entity === 'doctors' ? this.api.getDoctors() : this.api.getPatients();
    request.subscribe({
      next: data => this.records = data as Record<string, any>[],
      error: () => this.errorMessage = 'Cannot connect to JSON Server. Start it with: npm run api'
    });
  }

  openAdd(): void {
    this.editingId = null;
    this.formError = '';
    this.recordForm.reset({name:'',specialization:'',email:'',phone:'',age:18,gender:'Male',disease:'',doctorId:''});
    this.showForm = true;
  }

  openEdit(item: Record<string, any>): void {
    this.editingId = String(item['id']);
    this.formError = '';
    this.recordForm.patchValue(item);
    this.showForm = true;
  }

  closeForm(): void { this.showForm = false; }

  save(): void {
    if (this.recordForm.invalid) { this.recordForm.markAllAsTouched(); return; }
    const value = this.recordForm.getRawValue();
    const email = String(value.email).trim().toLowerCase();
    const duplicate = this.records.some(row => String(row['email']).toLowerCase() === email && String(row['id']) !== this.editingId);
    if (duplicate) { this.formError = 'A record with this email already exists.'; return; }

    if (this.entity === 'doctors') {
      const payload = { name: value.name!, specialization: value.specialization || '', email: email, phone: value.phone || '' };
      const request = this.editingId ? this.api.updateDoctor(this.editingId, payload) : this.api.addDoctor(payload);
      request.subscribe({ next: () => this.afterSave('Doctor record saved successfully.'), error: () => this.formError = 'Unable to save doctor record.' });
    } else {
      const payload = { name: value.name!, age: Number(value.age), gender: value.gender || 'Other', disease: value.disease || '', email, doctorId: value.doctorId || '' };
      const request = this.editingId ? this.api.updatePatient(this.editingId, payload) : this.api.addPatient(payload);
      request.subscribe({ next: () => this.afterSave('Patient record saved successfully.'), error: () => this.formError = 'Unable to save patient record.' });
    }
  }

  deleteRecord(item: Record<string, any>): void {
    if (!confirm(`Delete ${item['name']}? This cannot be undone.`)) return;
    const request = this.entity === 'doctors' ? this.api.deleteDoctor(String(item['id'])) : this.api.deletePatient(String(item['id']));
    request.subscribe({ next: () => { this.successMessage = 'Record deleted successfully.'; this.loadRecords(); }, error: () => this.errorMessage = 'Unable to delete record.' });
  }

  private afterSave(message: string): void {
    this.showForm = false;
    this.successMessage = message;
    this.loadRecords();
    setTimeout(() => this.successMessage = '', 3000);
  }
}