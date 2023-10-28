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
  private _keyWord !: string;

  searchByEntries = Object.entries(SearchBy);

  constructor() {
    this._searchBy = SearchBy.ALL;
    this.keyWord = ""
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
    const  data = this._keyWord != "" ?  this._searchedEvent : this._events;

    const currentDate = new Date();
    switch (key) {
      case SearchBy.ALL:
        this._searchedEvent = data;
        break;
      case SearchBy.TODAY:
        this._searchedEvent = data?.filter(event => {
          const eventDate = this.buildDate(event.date, event.startTime);
          return (
            eventDate.getFullYear() === currentDate.getFullYear() &&
            eventDate.getMonth() === currentDate.getMonth() &&
            eventDate.getDate() === currentDate.getDate()
          );
        });
        break;
      case SearchBy.FUTURE:
        this._searchedEvent = data?.filter(event =>  this.buildDate(event.date,event.startTime) > currentDate)
        break;
      case SearchBy.PAST:
        this._searchedEvent = data?.filter(event =>  this.buildDate(event.date,event.startTime) < currentDate)
        break;
      default:
        this._searchedEvent = data;
    }
  }

  onSearchByKeyWord(keyword : string){
    this._keyWord = keyword

    this._searchedEvent =  this._events?.filter(
      (event) => {
        return event.name.toLowerCase().includes(keyword.toLowerCase())
      }
    )
  }


  get searchedEvent(): Event[] | undefined {
    return this._searchedEvent;
  }

  set searchedEvent(value: Event[] | undefined) {
    this._searchedEvent = value;
  }


  get keyWord(): string {
    return this._keyWord;
  }

  set keyWord(value: string) {
    this._keyWord = value;
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
