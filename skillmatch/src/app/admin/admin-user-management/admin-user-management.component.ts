import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface User {
  name: string;
  role: string;
  status: string;
}

@Component({
  selector: 'app-admin-user-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.css']
})
export class AdminUserManagementComponent implements OnInit {
  private originalUsers: User[] = [
    { name: 'Avery Lin', role: 'Employer', status: 'Active' },
    { name: 'Luke Skywalker', role: 'Seeker', status: 'Inactive' },
    { name: 'Diana Prince', role: 'Seeker', status: 'Active' },
    { name: 'Natasha Romanoff', role: 'Seeker', status: 'Inactive' },
    { name: 'Peter Quill', role: 'Employer', status: 'Active' },
    { name: 'Steve Rogers', role: 'Seeker', status: 'Inactive' },
    { name: 'Clint Barton', role: 'Employer', status: 'Active' },
    { name: 'Wade Wilson', role: 'Seeker', status: 'Active' },
    { name: 'Wanda Maximoff', role: 'Employer', status: 'Inactive' },
    { name: 'Hal Jordan', role: 'Seeker', status: 'Suspended' },
    { name: 'Arthur Lin', role: 'Employer', status: 'Suspended' }
  ];

  users: User[] = [];
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      roleFilter: ['All'],
      searchQuery: ['']
    });
  }

  ngOnInit(): void {
    this.users = [...this.originalUsers].sort((a, b) => a.name.localeCompare(b.name));

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const { roleFilter, searchQuery } = this.filterForm.value;

    let filteredUsers = [...this.originalUsers].sort((a, b) => a.name.localeCompare(b.name));

    if (roleFilter !== 'All') {
      filteredUsers = filteredUsers.filter(user => user.role === roleFilter);
    }

    if (searchQuery.trim()) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    this.users = filteredUsers;
  }

  clearFilters(): void {
    this.filterForm.reset({
      roleFilter: 'All',
      searchQuery: ''
    });
  }

  viewUser(user: User) {
    console.log('View user:', user);
  }

  editUser(user: User) {
    console.log('Edit user:', user);
  }

  deleteUser(user: User) {
    console.log('Delete user:', user);
    this.originalUsers = this.originalUsers.filter(u => u.name !== user.name);
    this.applyFilters();
  }
}