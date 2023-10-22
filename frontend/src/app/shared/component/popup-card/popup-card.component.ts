import {Component, Input} from '@angular/core';
import {Event} from "../../types/event.type";

@Component({
  selector: 'app-popup-card',
  templateUrl: './popup-card.component.html',
  styleUrls: ['./popup-card.component.css']
})
export class PopupCardComponent {

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
