import { Component, OnInit } from '@angular/core';
import { CategorySimplified } from '../../../models/category-simplified.model';
import { CategoriesService } from '../../../services/categories.service';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesFormComponent } from '../categories-form/categories-form.component';
import { InputCategory } from '../../../models/input-category.model';
import { TasksListComponent } from '../../tasks/tasks-list/tasks-list.component';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, TasksListComponent],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent implements OnInit{

  categories: CategorySimplified[] = [];
  selectedCategory?: CategorySimplified;

  constructor(private categoriesService: CategoriesService, private modalService: NgbModal){

  }

  ngOnInit(): void{
    this.loadCategories().subscribe();
  }

  loadCategories(): Observable<CategorySimplified[]> {
    return this.categoriesService.getCategories()
      .pipe(
        tap(categories => this.categories = categories)
      );
  }

  onSelect(category: CategorySimplified){
    this.selectedCategory = category;
  }

  onDelete(id: number){
    if (!confirm('Are you sure?')) return;

    this.categoriesService.deleteCategory(id)
    .subscribe(() => {
      this.loadCategories().subscribe();
      if(this.selectedCategory && this.selectedCategory.id == id){
        this.selectedCategory = undefined;
      }
    });
  }

  onEdit(id: number){
    const modalRef = this.modalService.open(CategoriesFormComponent);

    modalRef.componentInstance.isEditing = true;
    let categoryToEdit = this.categories.find(category => category.id == id);
    if(categoryToEdit){
      let inputCategory: InputCategory = {name : categoryToEdit.name};
      modalRef.componentInstance.category = inputCategory;
    }

    modalRef.result.then((editedCategory: InputCategory) => {
      this.categoriesService.editCategory(id, editedCategory)
      .subscribe(() => {
        this.loadCategories()
        .subscribe(() => {
          this.selectedCategory = this.categories.find(category => category.id == id);
        });
      });
    });
  }

  onAdd(): void{
    const modalRef = this.modalService.open(CategoriesFormComponent);
    
    modalRef.componentInstance.isEditing = false;

    modalRef.result.then((newCategory: InputCategory) =>{
      this.categoriesService.addCategory(newCategory)
      .subscribe(() => {
        this.loadCategories().subscribe();
      });
    });
  }
}
