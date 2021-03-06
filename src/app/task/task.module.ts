import { TaskSimpleStoreService } from 'task-app-pkg/dist/tasks-module/services/task-simple-store.service';
import { SummaryController } from 'task-app-pkg/dist/tasks-module/mvc/summary/summary.controller';
import { TaskApiMock } from 'task-app-pkg/dist/tasks-module/api/task-mock.api';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { AddNewTaskController } from 'task-app-pkg/dist/tasks-module/mvc/add-new-task/add-new-task.controller';

import { AddNewTaskPassiveComponent } from './add-new-task-passive/add-new-task-passive.component';
import { AddNewTaskPassiveCotroller } from 'task-app-pkg/dist/tasks-module/mvc/add-new-task-passive/add-new-task-passive.controller';
import { SummaryComponent } from './summary/summary.component';
import { InMemoryTaskService } from 'task-app-pkg/dist/tasks-module/services/in-memory-task.service';
import { ListComponent } from './list/list.component';
import { ListController } from 'task-app-pkg/dist/tasks-module/mvc/list/list.controller';


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
    AddNewTaskPassiveComponent,
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
      provide: AddNewTaskPassiveCotroller,
      useFactory: addNewTaskPassiveCotrollerFactory
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
    AddNewTaskPassiveComponent,
    SummaryComponent,
    ListComponent,
  ]
})
export class TaskModule { }

export function addNewTaskControllerFactory() {

  const controller = new AddNewTaskController(service);

  return controller;
}

export function addNewTaskPassiveCotrollerFactory() {
  const controller = new AddNewTaskPassiveCotroller(service);

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
