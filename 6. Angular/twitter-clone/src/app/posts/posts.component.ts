import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  @Input() userId?: number;
  @Output() postSelected = new EventEmitter<number>()

  posts: any[] = []
  selectedPostId?: number;
  private apiService = inject(ApiService);

  ngOnInit() {
    this.loadPosts();
  }

  ngOnChanges(changes:SimpleChanges){
    if (changes['userId'] && this.userId)
    this.apiService.getPosts(this.userId).subscribe(data => this.posts = data)
  }

  loadPosts() {
    if (this.userId) {
      this.apiService.getPosts(this.userId).subscribe(data => {
        this.posts = data;
      });
    }
  }
  
  selectPost(postId:number){
    console.log('Selected post id:', postId);
    this.selectedPostId = postId;
    this.postSelected.emit(postId)
  }
}
