import { TaskApi } from './../../application/tasks/api/task.api';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { AddNewTaskController } from '../../application/tasks/mvc/add-new-task/add-new-task.controller';
import { TaskService } from '../../application/tasks/services/task.service';
import { AddNewTaskIsolatedComponent } from './add-new-task-isolated/add-new-task-isolated.component';
import { AddNewTaskIsolatedCotroller } from '../../application/tasks/mvc/add-new-task-isolated/add-new-task-isolated.controller';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    AddNewTaskComponent,
    AddNewTaskIsolatedComponent
],
  providers: [
    {
      provide: AddNewTaskController,
      useFactory: addNewTaskControllerFactory
    },
    {
      provide: AddNewTaskIsolatedCotroller,
      useFactory: addNewTaskIsolatedCotrollerFactory
    }
  ],
  exports: [
    AddNewTaskComponent,
    AddNewTaskIsolatedComponent
  ]
})
export class TaskModule { }

export function addNewTaskControllerFactory () {
  const api = new TaskApi();
  const service = new TaskService(api);
  const controller = new AddNewTaskController(service);

  return controller;
}

export function addNewTaskIsolatedCotrollerFactory() {
  const api = new TaskApi();
  const service = new TaskService(api);
  const controller = new AddNewTaskIsolatedCotroller(service);

  return controller;
}
