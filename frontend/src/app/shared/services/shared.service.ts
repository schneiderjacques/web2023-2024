
import { Injectable } from '@angular/core';
import {Event} from "../types/event.type";
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private eventSubject = new Subject<Event>();

  public triggerSeeEvent(event: Event) {
    this.eventSubject.next(event);
  }

  public getEventObservable(): Observable<Event> {
    return this.eventSubject.asObservable();
  }
}