import { Component, inject } from '@angular/core';
import { FormBuilder, FormArray, Validators, ReactiveFormsModule, AsyncValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  private existingUsernames = ['john_doe', 'jane_smith', 'admin'];

  profileForm = this.fb.group({
    username: ['', [Validators.required], [this.usernameValidator()]],
    email: ['', [Validators.required, Validators.email]],
    position: ['', [Validators.required]],
    skills: this.fb.array([])
  });

  get skills(): FormArray<FormControl> {
    return this.profileForm.get('skills') as FormArray<FormControl>;
  }

  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const username = control.value.toLowerCase();
      return of(this.existingUsernames.includes(username)).pipe(
        delay(500),
        map(exists => (exists ? { usernameTaken: true } : null))
      );
    };
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
      console.log('Form Data:', formData);
      this.http.post('http://localhost:3000/api/submit', formData).subscribe({
        next: (response) => {console.log('Data saved successfully:', response);
          window.alert('Application submitted!');
          this.profileForm.reset()
        },
        error: (error) => console.error('Error saving data:', error)
      });
    } else {
      console.log('Form is invalid');
    }
  }
}