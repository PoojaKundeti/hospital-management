import { Routes } from '@angular/router';
import { RolePageComponent } from './pages/role-page.component';

export const routes: Routes = [
  { path: 'admin/doctors', component: RolePageComponent, data: { role: 'Admin', entity: 'doctors', editable: true } },
  { path: 'admin/patients', component: RolePageComponent, data: { role: 'Admin', entity: 'patients', editable: true } },
  { path: 'doctor/doctors', component: RolePageComponent, data: { role: 'Doctor', entity: 'doctors', editable: false } },
  { path: 'doctor/patients', component: RolePageComponent, data: { role: 'Doctor', entity: 'patients', editable: true } },
  { path: 'patient/patients', component: RolePageComponent, data: { role: 'Patient', entity: 'patients', editable: false } },
  { path: '', redirectTo: 'admin/doctors', pathMatch: 'full' },
  { path: '**', redirectTo: 'admin/doctors' }
];