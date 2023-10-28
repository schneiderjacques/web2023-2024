import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../shared/types/event.type";
import {SearchBy} from "../shared/types/app.type";
import {SharedService} from "../shared/services/shared.service";






@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  private _events : Event[] | undefined;
  private _searchedEvent : Event[] | undefined;

  private _searchBy !: SearchBy;
  searchByEntries = Object.entries(SearchBy);

  constructor() {
    this._searchBy = SearchBy.ALL;
  }

  ngOnInit(): void {
    this.onSearchBy(this._searchBy);
  }


  get events(): Event[] | undefined {
    return this._events;
  }

  @Input()
  set events(value: Event[] | undefined) {
    this._events = value;
    this.onSearchBy(this.searchBy)

  }


  get searchBy(): SearchBy {
    return this._searchBy;
  }

  set searchBy(value: SearchBy) {
    this._searchBy = value;
  }

  onSearchBy(key : string){
    this._searchBy = key as SearchBy;
    const currentDate = new Date();

    switch (key) {
      case SearchBy.ALL:
        this._searchedEvent = this._events;
        break;
      case SearchBy.TODAY:
        this._searchedEvent = this._events?.filter(event => {
          const eventDate = this.buildDate(event.date, event.startTime);
          return (
            eventDate.getFullYear() === currentDate.getFullYear() &&
            eventDate.getMonth() === currentDate.getMonth() &&
            eventDate.getDate() === currentDate.getDate()
          );
        });
        break;
      case SearchBy.FUTURE:
        this._searchedEvent = this._events?.filter(event =>  this.buildDate(event.date,event.startTime) > currentDate)
        break;
      case SearchBy.PAST:
        this._searchedEvent = this._events?.filter(event =>  this.buildDate(event.date,event.startTime) < currentDate)
        break;
      default:
        this._searchedEvent = this._events;
    }
  }


  get searchedEvent(): Event[] | undefined {
    return this._searchedEvent;
  }

  set searchedEvent(value: Event[] | undefined) {
    this._searchedEvent = value;
  }

  private buildDate(date: string, time : string): Date{
    const providedDate = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    providedDate.setHours(hours);
    providedDate.setMinutes(minutes);
    return providedDate
  }

  protected readonly SearchBy = SearchBy;
}
