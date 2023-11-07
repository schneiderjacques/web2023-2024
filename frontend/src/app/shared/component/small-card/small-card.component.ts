import {Component, Input} from '@angular/core';
import {Event} from "../../types/event.type";
import { SharedService } from '../../services/shared.service';


enum BadgeInfoType {
  TODAY = 1,
  PASSED = 2,
  FUTURE = 3,
}

const BadgeInfoTypeText = {
  [BadgeInfoType.TODAY]: { text: "Aujourd'hui", color: "#898989" },
  [BadgeInfoType.PASSED]: { text: "Passé", color: "#B45526" },
  [BadgeInfoType.FUTURE]: { text: "À venir", color: "#0EAED6" },
};

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css']
})
export class SmallCardComponent {

  private _event! : Event
  formattedDate: string = '';
  private _badgeInfo!: BadgeInfoType;
  constructor(private sharedService: SharedService) {
  }


  @Input()
  get event(): Event {
    return this._event;
  }

  set event(value: Event) {
    this._event = value;
    this.formatStringToFrDate(this._event.date);
    this.badgeInfoInit();
  }

  seeEvent(){
    this.sharedService.triggerSeeEvent(this._event);
  }
  formatStringToFrDate(date: string): void {
    this.formattedDate = new Date(this._event.date).toLocaleDateString('fr-FR', {year: 'numeric', month: 'long', day: 'numeric'});
  }


  badgeInfoInit(): void{
    const currentDate = new Date();
    const eventDate = this.buildDate(this.event.date, this.event.startTime);
    if(
      eventDate.getFullYear() === currentDate.getFullYear() &&
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getDate() === currentDate.getDate() &&
      (eventDate.getHours() > currentDate.getHours()
        ||
      (eventDate.getHours() === currentDate.getHours() && eventDate.getMinutes() >= currentDate.getMinutes()))
    ) {
      this._badgeInfo = BadgeInfoType.TODAY
    }
    else if (eventDate > currentDate){
      this._badgeInfo =  BadgeInfoType.FUTURE;
    }else if (eventDate < currentDate){
      this._badgeInfo = BadgeInfoType.PASSED;
    }
  }



  private buildDate(date: string, time : string): Date{
    const providedDate = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    providedDate.setHours(hours);
    providedDate.setMinutes(minutes);
    return providedDate
  }


  get badgeInfo(): BadgeInfoType {
    return this._badgeInfo;
  }

  set badgeInfo(value: BadgeInfoType) {
    this._badgeInfo = value;
  }

  protected readonly BadgeInfoTypeText = BadgeInfoTypeText;
}
