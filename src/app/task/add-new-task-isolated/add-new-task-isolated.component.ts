import { Component, OnInit } from '@angular/core';
import { IAddNewTaskIsolatedView } from '../../../application/tasks/mvc/add-new-task-isolated/add-new-task-isolated.view';
import { AddNewTaskIsolatedCotroller } from '../../../application/tasks/mvc/add-new-task-isolated/add-new-task-isolated.controller';

@Component({
  selector: 'app-add-new-task-isolated',
  templateUrl: './add-new-task-isolated.component.html',
  styleUrls: ['./add-new-task-isolated.component.css']
})
export class AddNewTaskIsolatedComponent implements OnInit, IAddNewTaskIsolatedView {

  viewModel = new AddNewTaskIsolatedModel();

  constructor(
    private controller: AddNewTaskIsolatedCotroller
  ) { }

  ngOnInit() {
    this.controller.init(this);
  }

  setMaxLenghTaskName(maxLength: number) {
    this.viewModel.maxLengthTaskName = maxLength;
  }

  lock(): void {
    this.viewModel.isLock = true;
  }
  getTaskName(): string {
    return this.viewModel.taskName;
  }
  unlock(): void {
    this.viewModel.isLock = false;
  }
  showSuccessfulMessageOnAddNewTask(taskId: string) {
    this.viewModel.setSuccessMessage('A new task has been added with id: ' + taskId);
  }
  showErrorMessageOnAddNewTask() {
    this.viewModel.setErrorMessage('An error ocurred, the service is unavailable');
  }

  onAddTaskClick() {
    this.controller.onAddTaskEvent();
  }

}

export class AddNewTaskIsolatedModel {
  isLock = false;
  taskName: string;
  maxLengthTaskName = 100000;
  errorMessageVisible = false;
  successMessageVisible = false;
  errorMessage = '';
  successMessage = '';

  setSuccessMessage(message: string) {
    this.successMessage = message;
    this.showSuccess();
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
    this.showError();
  }

  private showError() {
      this.errorMessageVisible = true;
      this.successMessageVisible = false;
  }
  private showSuccess() {
      this.successMessageVisible = true;
      this.errorMessageVisible = false;
  }
}
