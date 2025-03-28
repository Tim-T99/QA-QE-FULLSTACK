import { Component } from '@angular/core';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { CommentsComponent } from './comments/comments.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ UsersComponent, PostsComponent, CommentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'twitter-clone';

  selectedUserId:number | null = null
  selectedPostId:number | null = null
}
