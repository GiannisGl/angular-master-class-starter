import { Component, OnInit } from '@angular/core';
import {TabComponent} from '../tab/tab.component';

@Component({
  selector: 'trm-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  tabs: TabComponent[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addTab(tab: TabComponent): void {
    this.tabs.push(tab);
    if (this.tabs.length === 1) {
      this.select(tab);
    }
  }

  select(tab: TabComponent): void {
    this.resetTabs();
    tab.selected = true;
  }

  private resetTabs() {
    for (const tabTmp of this.tabs) {
      tabTmp.selected = false;
    }
  }
}
