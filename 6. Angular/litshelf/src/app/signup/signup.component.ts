import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { passwordMatcher } from '../validators/password-matcher.validator';
import { AuthService } from '../services/auth.service';
import { userData } from '../types/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {


  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private authService = inject(AuthService)
  private router = inject(Router)
  private existingUsernames = ['john_doe', 'jane_smith', 'admin', 'librarian'];

  signupForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
  },
  {validators: passwordMatcher('password', 'confirmPassword')}
);

onSubmit(){
  if (this.signupForm.valid) {
    const formData = this.signupForm.value;

    const username = formData.username as string;
    const email = formData.email as string;
    const password = formData.password as string;

    this.authService.signup(username, email, password).subscribe({
      next: () => {
        window.alert('Data submitted!');
        this.signupForm.reset()
        this.router.navigate(['/home']);
      },
      error: (error) => {console.error('Error saving data:', error)
        if (error.status === 400 && error.error.message === 'User already exists') {
          window.alert('User already exists.');
          this.signupForm.reset()
        } else {
          window.alert('An error occurred. Please try again later.');
        }
      }
    });
  } else {
    window.alert('Please fill all fields')
  }
}
}
