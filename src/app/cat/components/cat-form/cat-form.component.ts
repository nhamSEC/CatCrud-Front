import { Component, OnInit } from '@angular/core';
import { CatService } from '../../services/cat.service';
import { Cat } from '../../models/cat.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cat-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cat-form.component.html',
  styleUrls: ['./cat-form.component.css'],
})
export class CatFormComponent implements OnInit {
  cat?: Cat;
  catData: Cat = {
    id: '',
    name: '',
    nickName: '',
    age: 0,
    type: '',
    isCatHappy: false,
  };

  isEdit: boolean = false;

  constructor(
    private catService: CatService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      debugger;
      this.isEdit = true;
      this.catService.getCatById(id).subscribe((cat) => {

        console.log(cat);
        this.cat = cat;
        this.catData = { ...cat };
      });
    }
  }

  saveCat() {
    if (this.cat) {
      this.catService.updateCat(this.cat.id!, this.catData).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.catService.addCat(this.catData).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
