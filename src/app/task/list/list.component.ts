import { Component, OnInit } from '@angular/core';
import { Task } from '../../../application/tasks/entities/task.model';
import { ListView } from '../../../application/tasks/mvc/list/list.view';
import { ListController } from '../../../application/tasks/mvc/list/list.controller';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit, ListView {
  tasks: Array<Task> = [];

  constructor(
    private controller: ListController
  ) { }

  ngOnInit() {
    this.controller.init(this);
  }

  updateList(taks: Task[]) {
    this.tasks = taks;
  }
}
