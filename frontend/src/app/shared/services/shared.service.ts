
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
  private eventDisplayAfterFlyMap = new Subject<Event>();
  private changeEventLocation = new Subject<Event>();

  public triggerSeeEvent(event: Event) {
    this.eventSubject.next(event);
  }

  public triggerAddEvent(event: Event) {
    this.eventToAddSubject.next(event);
  }
  public triggerEventDisplayAfterFlyMap(event: Event) {
    this.eventDisplayAfterFlyMap.next(event);
  }

  public triggerChangeLocation(event: Event) {
    this.changeEventLocation.next(event);
  }


  public getEventObservable(): Observable<Event> {
    return this.eventSubject.asObservable();
  }

  public getEventToAddObservable(): Observable<Event> {
    return this.eventToAddSubject.asObservable();
  }

  public getEventDisplayAfterFlyMap(): Observable<Event> {
    return this.eventDisplayAfterFlyMap.asObservable();
  }


  public getChangeLocation(): Observable<Event> {
    return this.changeEventLocation.asObservable();
  }

}
