import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environements/environement";
import {defaultIfEmpty, filter, Observable} from "rxjs";
import {Event} from "../types/event.type";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly _backendURL: any;

  constructor(private _http : HttpClient, private authService : AuthService) {
    this._backendURL = {};
    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }
    // build all backend urls
    // @ts-ignore
    Object.keys(environment.backend.endpoints).forEach(
      (k) =>
        // @ts-ignore
        (this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`)
    );
  }

  /**
   * Function to return list of events from the backEnd Api
   */
  fetch(): Observable<Event[]> {
    return this._http.get<Event[]>(this._backendURL.allEvents)
      .pipe(
        filter((events: Event[]) => !!events),
        defaultIfEmpty([])
      );
  }

  /**
   * Function to return one event for current id
   */
  fetchOne(id: string): Observable<Event> {
    return this._http.get<Event>(this._backendURL.oneEvent.replace(':id', id));
  }

  /**
   * Function to create a new event
   */
  create(event: Event): Observable<any> {
    return this._http.post<Event>(this._backendURL.allEvents, event, this._options());
  }


  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getToken()}`)
      .set('Content-Type', 'application/json');
    return { headers, headerList };
  }

}
