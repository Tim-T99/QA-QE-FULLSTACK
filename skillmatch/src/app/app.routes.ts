import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { SeekerSignupComponent } from './seeker-signup/seeker-signup.component';
import { RoleSelectComponent } from './role-select/role-select.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminUserManagementComponent } from './admin/admin-user-management/admin-user-management.component';
import { AdminAccountComponent } from './admin/admin-account/admin-account.component';
import { AdminChatComponent } from './admin/admin-chat/admin-chat.component';

export const routes: Routes = [
    { path: '', component: LandingComponent},
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'seeker-signup', component: SeekerSignupComponent},
    { path: 'role-select', component: RoleSelectComponent },
    { path: 'admin', component: AdminLayoutComponent, children:[
        {path: 'adminDash', component: AdminDashboardComponent},
        {path: 'adminUserMgmt', component: AdminUserManagementComponent},
        {path: 'adminAccount', component: AdminAccountComponent},
        {path: 'adminChat', component: AdminChatComponent},
        {path: '', redirectTo: 'adminDash', pathMatch:'full'}
    ]}
];
