import { Component } from '@angular/core';
import { InputCategory } from '../../../models/input-category.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './categories-form.component.html',
  styleUrl: './categories-form.component.css'
})
export class CategoriesFormComponent {

  isEditing: boolean = false;
  category: InputCategory = {name: ''};

  constructor(public activeModal: NgbActiveModal){}

  onSave(): void{
    this.activeModal.close(this.category);
  }

  onCancel(): void{
    this.activeModal.dismiss();
  }
}
