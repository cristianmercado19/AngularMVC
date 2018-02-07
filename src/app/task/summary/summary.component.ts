import { SummaryView } from 'task-app-pkg/dist/tasks-module/mvc/summary/summary.view';
import { SummaryController } from 'task-app-pkg/dist/tasks-module/mvc/summary/summary.controller';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
})
export class SummaryComponent implements OnInit, SummaryView {

  total = 0;

  setTotalCount(newTotal: number) {
    this.total = newTotal;
  }

  constructor(
    private controller: SummaryController
  ) { }

  ngOnInit() {
    this.controller.init(this);
  }

}
