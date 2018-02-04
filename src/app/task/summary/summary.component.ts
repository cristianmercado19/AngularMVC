import { SummaryView } from './../../../application/tasks/mvc/summary/summary.view';
import { SummaryController } from './../../../application/tasks/mvc/summary/summary.controller';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
})
export class SummaryComponent implements OnInit, SummaryView {

  private total = 0;

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
