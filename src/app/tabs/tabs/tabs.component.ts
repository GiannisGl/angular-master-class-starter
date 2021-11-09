import {AfterContentInit, Component, ContentChildren, OnInit, QueryList} from '@angular/core';
import {TabComponent} from '../tab/tab.component';

@Component({
  selector: 'trm-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabComponent)
  tabs: QueryList<TabComponent>;

  constructor() { }

  ngAfterContentInit(): void {
    this.select(this.tabs.first);
  }

  select(tab: TabComponent): void {
    this.resetTabs();
    tab.selected = true;
  }

  private resetTabs() {
    this.tabs.forEach(tab => tab.selected = false);
  }
}
