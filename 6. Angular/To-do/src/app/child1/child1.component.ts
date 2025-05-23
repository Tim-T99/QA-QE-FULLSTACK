import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child1',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './child1.component.html',
  styleUrl: './child1.component.css'
})
export class Child1Component {
  @Output() emitItemEvent = new EventEmitter<{ name: string, description: string }>();
  name = '';
  description = '';

  onAddItem() {
    if (this.name=='', this.description=='') {
      window.alert('Please fill both fields');
      return
    }else{
      this.emitItemEvent.emit({ name: this.name, description: this.description });
      this.name = ''; // Clear inputs after adding
      this.description = '';
    }
    
  }
}