import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child2.component.html',
  styleUrl: './child2.component.css'
})
export class Child2Component {
  @Input() items: { name: string, description: string }[] = [];
  @Output() deleteEvent = new EventEmitter<number>();

  onDelete(index: number) {
    this.deleteEvent.emit(index);
  }
}