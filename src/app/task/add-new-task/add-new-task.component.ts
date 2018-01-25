import { Component, OnInit } from '@angular/core';
import { IAddNewTaskView } from '../../../application/tasks/mvc/add-new-task/add-new-task.view';
import { AddNewTaskController } from '../../../application/tasks/mvc/add-new-task/add-new-task.controller';
import { AddNewTaskViewModel } from '../../../application/tasks/mvc/add-new-task/add-new-task.model';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.css']
})
export class AddNewTaskComponent implements OnInit, IAddNewTaskView {

  viewModel = new AddNewTaskViewModel();

  errorMessage = '';
  successMessage = '';

  constructor(
    private controller: AddNewTaskController
  ) {
  }

  ngOnInit(): void {
    this.controller.init(this);
  }

  setViewModel(viewModel: AddNewTaskViewModel) {
    this.viewModel = viewModel;
  }

  showServiceIsUnavailableErrorMessage() {
    this.errorMessage = 'An error ocurred, the service is unavailable';
  }
  cleanMessages() {
    this.cleanErrorMessage();
    this.cleanSuccessMessage();
  }
  showTaskAddedSuccessfulyMessage(taskId: string) {
    this.successMessage = 'A new task has been added with id: ' + taskId;
  }

  private cleanErrorMessage() {
    this.errorMessage = '';
  }

  private cleanSuccessMessage() {
    this.successMessage = '';
  }

  onAddTaskClick() {
    this.controller.onAddTaskEvent();
  }
}