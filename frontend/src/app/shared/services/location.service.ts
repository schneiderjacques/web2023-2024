import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map} from 'rxjs';
import { LatLngTuple } from 'leaflet';
import {Event} from "../types/event.type";

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


  reverseGeocode(event : Event): Observable<Event> {
    const apiKey = 'aeb1aaa0cba148d48eb67f53cc30eeeb'; // Remplacez par votre clé API OpenCage Geocoding
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${event.location.latitude}+${event.location.longitude}&key=${apiKey}`;
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods' : 'GET',
      'Access-Control-Allow-Origin': '*'
    });

    return this._http.get(apiUrl,{headers})
      .pipe(
        map( (response: any ) => {
          if (response.results.length <= 0) {
            const location = response.results[0];
            const components = location.components;
            event.location.city = components.city;
            event.location.street = components.road;
            event.location.postalCode = components.postcode;
          }
          return event
        })
      );
  }

}
