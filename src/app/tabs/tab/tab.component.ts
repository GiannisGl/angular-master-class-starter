import {Component, Input, OnInit} from '@angular/core';
import {TabsComponent} from '../tabs/tabs.component';

@Component({
  selector: 'trm-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @Input() selected = false;
  @Input() title = '';

  constructor(private tabs: TabsComponent) { }

  ngOnInit(): void {
    this.tabs.addTab(this);
  }
}
