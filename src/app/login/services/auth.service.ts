// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:8080/api/Auth/login'; 

  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor() {}

  async login(username: string, password: string): Promise<any> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName: username,
          password: password
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.isSuccess) {
          // Save the token and user data in localStorage
          const user = result.payload;
          localStorage.setItem('currentUser', JSON.stringify(user));

          // Emit the current user to other parts of the app
          this.currentUserSubject.next(user);
          return user;
        } else {
          throw new Error('Login failed');
        }
      } else {
        throw new Error('Failed to connect to the server');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')||""):null;
    return !!user
  }

}
