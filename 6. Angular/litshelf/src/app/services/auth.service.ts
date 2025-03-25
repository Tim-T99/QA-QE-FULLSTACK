import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  signup(username: string, email:string, password:string): Observable<any>{
    console.log('Signing up:', {username, email, password});
    return of({message: 'Signup successful'})
  }

  login(email:string, password:string): Observable<any>{
    console.log('Logging in:', {email, password})
    return of({message: 'Login successful'})
  }

  getUserRole(): Observable<number> {
    // Placeholder: Assume role_id 3 (Borrower) for now
    return of (3);
  }
}
