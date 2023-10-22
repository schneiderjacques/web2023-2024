import {Component, Input} from '@angular/core';
import {Event} from "../../types/event.type";
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css']
})
export class SmallCardComponent {

  private _event! : Event
  constructor(private sharedService: SharedService) {
  }


  @Input()
  get event(): Event {
    return this._event;
  }

  set event(value: Event) {
    this._event = value;
  }

  seeEvent(){
    this.sharedService.triggerSeeEvent(this._event);
  }

}
