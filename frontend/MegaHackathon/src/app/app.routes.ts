import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashTecnicoComponent } from './dash-tecnico/dash-tecnico.component';
import { DashAdminComponent } from './dash-admin/dash-admin.component'

export const routes: Routes = [
    { path:'', redirectTo: '/login',pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'DashTecnico', component: DashTecnicoComponent },
    { path: 'DashAdmin', component: DashAdminComponent}
];
    