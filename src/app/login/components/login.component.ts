// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit() {
    try {
      const user = await this.authService.login(this.username, this.password);
      
      this.router.navigate(['/dashboard']); 
    } catch (error) {      
      this.errorMessage = 'Login failed. Please check your username and password.';
    }
  }

  getUser(){
    const user = JSON.parse(localStorage.getItem("currentUser")??"")
if(user)
{
  console.log("user",user)
}
  }
}
