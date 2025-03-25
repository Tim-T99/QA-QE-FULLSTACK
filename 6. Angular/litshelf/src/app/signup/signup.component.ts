import { CommonModule } from '@angular/common';
import { FormsModule, NgForm} from '@angular/forms'
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  form=''
  onSubmit(form:NgForm){
    console.log(form)
  }

  constructor(private authService: AuthService, private router: Router){

  }
 
}
