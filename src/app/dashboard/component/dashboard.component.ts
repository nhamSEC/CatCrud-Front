import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private router: Router) {}

  // Navigate to the show all cats page
  showAllCats() {
    this.router.navigate(['/cats']);
  }

  addNewCat() {
    this.router.navigate(['/add']);
  }
}
