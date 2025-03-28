import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpClient = inject(HttpClient);
  
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  getUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseUrl}/users`)
  }
  getPosts(userId:number):Observable<Post[]>{
    return this.httpClient.get<Post[]>(`${this.baseUrl}/posts?`, {
      params: {userId: userId.toString()}
    })
  }
  getComments(postId:number):Observable<Comment[]>{
    return this.httpClient.get<Comment[]>(`${this.baseUrl}/comments`, {
      params: {postId: postId.toString()}
    })
  }
}
