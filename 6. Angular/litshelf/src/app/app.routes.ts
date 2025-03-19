import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
    { path: '', component: WelcomeComponent }, // Root path shows welcome page//
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent }
];
