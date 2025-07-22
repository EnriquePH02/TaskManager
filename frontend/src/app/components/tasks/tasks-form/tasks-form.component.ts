import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTask } from '../../../models/input-task.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tasks-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tasks-form.component.html',
  styleUrl: './tasks-form.component.css'
})
export class TasksFormComponent {

  isEditing: boolean = false;
  task: InputTask = {title: '', description: '', isDone: false};

  constructor(public activeModal: NgbActiveModal){}

  onSave(): void{
    this.activeModal.close(this.task);
  }

  onCancel(): void{
    this.activeModal.dismiss();
  }

}
