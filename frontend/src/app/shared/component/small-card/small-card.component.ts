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
  formattedDate: string = '';
  constructor(private sharedService: SharedService) {
  }


  @Input()
  get event(): Event {
    return this._event;
  }

  set event(value: Event) {
    this._event = value;
    this.formatStringToFrDate(this._event.date);
  }

  seeEvent(){
    this.sharedService.triggerSeeEvent(this._event);
  }
  formatStringToFrDate(date: string): void {
    this.formattedDate = new Date(this._event.date).toLocaleDateString('fr-FR', {year: 'numeric', month: 'long', day: 'numeric'});
  
    
  }

}
