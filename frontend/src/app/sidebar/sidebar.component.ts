import {Component, Input} from '@angular/core';
import {Event} from "../shared/types/event.type";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  private _events : Event[] | undefined;

  constructor() {
  }
  @Input()
  get events(): Event[] | undefined {
    return this._events;
  }

  set events(value: Event[] | undefined) {
    this._events = value;
  }
}
