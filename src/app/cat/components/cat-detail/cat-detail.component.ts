import { Component, Input, OnInit } from '@angular/core';
import { CatService } from '../../services/cat.service';
import { Cat } from '../../models/cat.model';

@Component({
  selector: 'app-cat-detail',
  standalone: true,
  templateUrl: './cat-detail.component.html',
  styleUrls: ['./cat-detail.component.css'],
})
export class CatDetailComponent implements OnInit {
  @Input() catName!: string;
  cat?: Cat;

  constructor(private catService: CatService) {}

  ngOnInit(): void {
    this.catService.getCatById(this.catName).subscribe((cat) => {
      this.cat = cat;
    });
  }
}
