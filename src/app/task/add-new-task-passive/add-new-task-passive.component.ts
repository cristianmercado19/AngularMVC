import { Component, OnInit } from '@angular/core';
import { AddNewTaskPassiveView } from '../../../application/tasks/mvc/add-new-task-passive/add-new-task-passive.view';
import { AddNewTaskPassiveCotroller } from '../../../application/tasks/mvc/add-new-task-passive/add-new-task-passive.controller';

@Component({
  selector: 'app-add-new-task-passive',
  templateUrl: './add-new-task-passive.component.html',
})
export class AddNewTaskPassiveComponent implements OnInit, AddNewTaskPassiveView {

  viewModel = new AddNewTaskPassiveModel();

  constructor(
    private controller: AddNewTaskPassiveCotroller
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
  showSuccessfulMessageOnAddNewTask(taskId: number) {
    this.viewModel.setSuccessMessage('A new task has been added with id: ' + taskId);
  }
  showErrorMessageOnAddNewTask() {
    this.viewModel.setErrorMessage('An error ocurred, the service is unavailable');
  }

  onAddTaskClick() {
    this.controller.onAddTaskEvent();
  }

}

export class AddNewTaskPassiveModel {
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
