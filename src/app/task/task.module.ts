import { TaskApi } from './../../application/tasks/api/task.api';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { AddNewTaskController } from '../../application/tasks/mvc/add-new-task/add-new-task.controller';
import { TaskService } from '../../application/tasks/services/task.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    TaskComponent,
    AddNewTaskComponent
  ],
  providers: [
    {
      provide: AddNewTaskController,
      useFactory: addNewTaskControllerFactory
    },
  ],
  exports: [
    AddNewTaskComponent
  ]
})
export class TaskModule { }

export function addNewTaskControllerFactory () {
  const api = new TaskApi();
  const service = new TaskService(api);
  const controller = new AddNewTaskController(service);

  return controller;
}
