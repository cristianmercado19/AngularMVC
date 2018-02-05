import { TaskSimpleStoreService } from './../../application/tasks/services/task-simple-store.service';
import { SummaryController } from './../../application/tasks/mvc/summary/summary.controller';
import { TaskApiMock } from './../../application/tasks/api/task-mock.api';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { AddNewTaskController } from '../../application/tasks/mvc/add-new-task/add-new-task.controller';

import { AddNewTaskIsolatedComponent } from './add-new-task-isolated/add-new-task-isolated.component';
import { AddNewTaskIsolatedCotroller } from '../../application/tasks/mvc/add-new-task-isolated/add-new-task-isolated.controller';
import { SummaryComponent } from './summary/summary.component';
import { InMemoryTaskService } from '../../application/tasks/services/in-memory-task.service';
import { ListComponent } from './list/list.component';
import { ListController } from '../../application/tasks/mvc/list/list.controller';

const storeService = new TaskSimpleStoreService();
const api = new TaskApiMock();
const service = new InMemoryTaskService(api, storeService);

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
,
    ListComponent
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
    },
    {
      provide: ListController,
      useFactory: listControllerFactory
    }
  ],
  exports: [
    AddNewTaskComponent,
    AddNewTaskIsolatedComponent,
    SummaryComponent,
    ListComponent,
  ]
})
export class TaskModule { }

export function addNewTaskControllerFactory() {

  const controller = new AddNewTaskController(service);

  return controller;
}

export function addNewTaskIsolatedCotrollerFactory() {
  const controller = new AddNewTaskIsolatedCotroller(service);

  return controller;
}

export function summaryControllerFactory() {

  const controller = new SummaryController(storeService);

  return controller;
}

export function listControllerFactory() {

  const controller = new ListController(storeService);

  return controller;
}
