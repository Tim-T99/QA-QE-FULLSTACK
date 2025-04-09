import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { SeekerSignupComponent } from './seeker-signup/seeker-signup.component';
import { RoleSelectComponent } from './role-select/role-select.component';

export const routes: Routes = [
    { path: '', component: LandingComponent},
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'seeker-signup', component: SeekerSignupComponent},
    { path: 'role-select', component: RoleSelectComponent }
];
