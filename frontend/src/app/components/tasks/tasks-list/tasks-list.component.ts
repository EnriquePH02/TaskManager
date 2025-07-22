import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CategorySimplified } from '../../../models/category-simplified.model';
import { CommonModule } from '@angular/common';
import { TaskSimplified } from '../../../models/task-simplified.model';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../models/category.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TasksFormComponent } from '../tasks-form/tasks-form.component';
import { InputTask } from '../../../models/input-task.model';
import { TasksService } from '../../../services/tasks.service';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { Task } from 'zone.js/lib/zone-impl';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, TaskDetailsComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit, OnChanges{
  @Input() category!: CategorySimplified;
  tasks: TaskSimplified[] = [];
  selectedTask?: TaskSimplified;

  constructor(private categoriesService: CategoriesService, private tasksService: TasksService, private modalService: NgbModal){}

  ngOnInit(): void {
      this.loadTasks().subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category'] && this.category?.id) {
      this.selectedTask = undefined;
      this.loadTasks().subscribe();
    }
  }

  loadTasks(): Observable<Category>{
    return this.categoriesService.getCategory(this.category.id)
      .pipe(
        tap(categoryWithTasks => this.tasks = categoryWithTasks.tasks)
    );
  }

  onSelect(task: TaskSimplified){
    this.selectedTask = task;
  }

  addTask(id: number){
    const modalRef = this.modalService.open(TasksFormComponent);

    modalRef.componentInstance.isEditing = false;

    modalRef.result.then((newTask: InputTask) => {
      this.tasksService.addTask(this.category.id, newTask)
      .subscribe(() => {
        this.loadTasks().subscribe();
      });
    });
  }

  onEdit(editedTask: InputTask): void{
    if(this.selectedTask){
      let selectedTaskId = this.selectedTask.id;
      this.tasksService.editTask(this.category.id,this.selectedTask.id,editedTask)
      .subscribe(() => {
        this.loadTasks()
        .subscribe(() => {
          this.selectedTask = this.tasks.find(task => task.id == selectedTaskId);
        });
      });
    }
  }

  onDelete(id: number): void{
    this.tasksService.deleteTask(this.category.id,id)
    .subscribe(() => {
      this.loadTasks().subscribe();
      this.selectedTask = undefined;
    })
  }
}
