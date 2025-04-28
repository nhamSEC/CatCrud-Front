import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatService } from '../../services/cat.service';
import { Cat } from '../../models/cat.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cat-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.css'],
})
export class CatListComponent implements OnInit {
  cats: Cat[] = [];  

  constructor(
    private catService: CatService,
    private router: Router
  ) {}

  ngOnInit(): void {    
    this.catService.getCats().subscribe((cats) => {
      this.cats = cats;
    });
  }

  editCat(id: string) {
    this.router.navigate(['/edit', id]);
  }
  
  deleteCat(id: string) {
    this.catService.deleteCat(id).subscribe(() => {
      this.cats = this.cats.filter((cat) => cat.id !== id); 
    });
  }
}
