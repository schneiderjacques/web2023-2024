
import { Injectable } from '@angular/core';
import {Event} from "../types/event.type";
import { Observable, Subject, of } from 'rxjs';
import {SearchBy} from "../types/app.type";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private eventSubject = new Subject<Event>();
  private eventToAddSubject = new Subject<Event>();
  private eventSearchBy = new Subject<SearchBy>();

  public triggerSeeEvent(event: Event) {
    this.eventSubject.next(event);
  }

  public triggerAddEvent(event: Event) {
    this.eventToAddSubject.next(event);
  }


  public getEventObservable(): Observable<Event> {
    return this.eventSubject.asObservable();
  }

  public getEventToAddObservable(): Observable<Event> {
    return this.eventToAddSubject.asObservable();
  }

}
