import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TaskSimplified } from '../../../models/task-simplified.model';
import { Task } from '../../../models/task.model';
import { TasksService } from '../../../services/tasks.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputTask } from '../../../models/input-task.model';
import { TasksFormComponent } from '../tasks-form/tasks-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent implements OnInit, OnChanges{
  @Input() task! : TaskSimplified;
  @Input() categoryId!: number;
  @Output() editedTask = new EventEmitter<InputTask>();
  @Output() deletedTask = new EventEmitter<number>();
  detailedTask: Task = {id: 0, title: '', description: '', isDone: false, categoryId: 0};

  constructor(private tasksService: TasksService, private modalService: NgbModal){}

  ngOnInit(): void {
      this.loadTask();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task?.id) {
      this.loadTask();
    }      
  }

  loadTask(): void{
    this.tasksService.getTask(this.categoryId,this.task.id)
    .subscribe((taskWithDetails: Task) => {
      this.detailedTask = taskWithDetails;
    });
  }

  onEdit(){
    const modalRef = this.modalService.open(TasksFormComponent);

    modalRef.componentInstance.isEditing = true;

    let inputTask: InputTask = {
      title: this.detailedTask.title, 
      description: this.detailedTask.description, 
      isDone: this.detailedTask.isDone
    };
    modalRef.componentInstance.task = inputTask;

    modalRef.result.then((editedTask: InputTask) => {
      this.editedTask.emit(editedTask);
    });
  }

  onDelete(id: number){
    if (!confirm('Are you sure?')) return;

    this.deletedTask.emit(id);
  }
}
