import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Child1Component } from './child1/child1.component';
import { Child2Component } from './child2/child2.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Child1Component, Child2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  listItems: { name: string, description: string }[] = [];

  addItem(name: string, description: string) {
    this.listItems.push({ name, description });
  }

  deleteItem(index: number) {
    this.listItems.splice(index, 1); // Remove item at the given index
  }
}