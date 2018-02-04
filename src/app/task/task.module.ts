import { TaskSimpleStoreService } from './../../application/tasks/services/task-simple-store.service';
import { SummaryController } from './../../application/tasks/mvc/summary/summary.controller';
import { TaskApi } from './../../application/tasks/api/task.api';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { AddNewTaskController } from '../../application/tasks/mvc/add-new-task/add-new-task.controller';
import { InMemoryTaskService } from '../../application/tasks/services/in-memory-task.service';
import { AddNewTaskIsolatedComponent } from './add-new-task-isolated/add-new-task-isolated.component';
import { AddNewTaskIsolatedCotroller } from '../../application/tasks/mvc/add-new-task-isolated/add-new-task-isolated.controller';
import { SummaryComponent } from './summary/summary.component';

const api = new TaskApi();
const service = new InMemoryTaskService();
const storeService = new TaskSimpleStoreService();

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    AddNewTaskComponent,
    AddNewTaskIsolatedComponent,
    SummaryComponent
  ],
  providers: [
    {
      provide: AddNewTaskController,
      useFactory: addNewTaskControllerFactory
    },
    {
      provide: AddNewTaskIsolatedCotroller,
      useFactory: addNewTaskIsolatedCotrollerFactory
    },
    {
      provide: SummaryController,
      useFactory: summaryControllerFactory
    }
  ],
  exports: [
    AddNewTaskComponent,
    AddNewTaskIsolatedComponent,
    SummaryComponent,
  ]
})
export class TaskModule { }

export function addNewTaskControllerFactory() {

  const controller = new AddNewTaskController(service);

  return controller;
}

export function addNewTaskIsolatedCotrollerFactory() {
  const controller = new AddNewTaskIsolatedCotroller(service, storeService);

  return controller;
}

export function summaryControllerFactory() {

  const controller = new SummaryController(storeService);

  return controller;
}
