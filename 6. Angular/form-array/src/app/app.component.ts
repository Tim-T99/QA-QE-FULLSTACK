import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  private formBuilder = inject(FormBuilder);

  profileForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    position: ['', [Validators.required]],
    skills: this.formBuilder.group({
      skill1: ['', [Validators.required]],
      skill2: ['', [Validators.required]],
      skill3: ['', [Validators.required]],
      skill4: [''],
    }),
  });

  onSubmit() {
    console.log(this.profileForm.value)
  }
}