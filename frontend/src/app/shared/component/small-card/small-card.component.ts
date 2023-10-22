import {Component, Input} from '@angular/core';
import {Event} from "../../types/event.type";

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css']
})
export class SmallCardComponent {

  private _event : Event| undefined;
  constructor() {
  }


  @Input()
  get event(): Event | undefined {
    return this._event;
  }

  set event(value: Event | undefined) {
    this._event = value;
  }
}
