import { Component, OnInit } from '@angular/core';
import { AddNewTaskView } from 'task-app-pkg/dist/tasks-module/mvc/add-new-task/add-new-task.view';
import { AddNewTaskController } from 'task-app-pkg/dist/tasks-module/mvc/add-new-task/add-new-task.controller';
import { AddNewTaskViewModel } from 'task-app-pkg/dist/tasks-module/mvc/add-new-task/add-new-task.model';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
})
export class AddNewTaskComponent implements OnInit, AddNewTaskView {

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
  showTaskAddedSuccessfulyMessage(taskId: number) {
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
