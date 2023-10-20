import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, mergeMap, of } from 'rxjs';
import { LatLngTuple } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor( private _http : HttpClient) { }


  getLocation(): Observable<LatLngTuple> {
    return this._http.get('https://ipapi.co/json/').pipe(
      map((data: any) => {
        // Ensure 'data' is an object with 'latitude' and 'longitude' properties
        if (data && data.latitude && data.longitude) {
          return [data.latitude,data.longitude]as LatLngTuple ;
        } else {
          throw new Error('Invalid data format from the API.');
        }
      })
    );
  }
}
