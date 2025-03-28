import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: any[]=[]
  selectedUserId:number = 1;

  @Output() userSelected = new EventEmitter<number>()

  private apiService = inject(ApiService);

  ngOnInit(){
    this.apiService.getUsers().subscribe(data => {this.users = data;
      if (data.length > 0) {
        this.selectedUserId = data[0].id
      }
    })
  }

  selectUser(event: Event): void {
    const userId = Number((event.target as HTMLSelectElement).value);
    console.log('Selected User ID:', userId);
    this.userSelected.emit(userId)
  }
  
}
