import { CommonModule } from '@angular/common';
import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-comments',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  @Input() postId?:number;
  comments: any[] = []

  private apiService = inject(ApiService)

  ngOnChanges(changes:SimpleChanges){
    if (changes['postId'] && this.postId) {
      this.apiService.getComments(this.postId).subscribe(data => this.comments = data)
    }
    
  }
}
