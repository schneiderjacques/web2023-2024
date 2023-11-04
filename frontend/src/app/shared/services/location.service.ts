import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map} from 'rxjs';
import { LatLngTuple } from 'leaflet';
import {Event} from "../types/event.type";
//GEt key from environement
import {environment} from "../../../environements/environement";
import {Location} from "../types/event.type";
@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor( private _http : HttpClient) { }


  reverseGeocode(event : Event): Observable<Location> {
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${event.location.latitude}+${event.location.longitude}&key=${environment.geocode.apiKey}`;
    var result = {} as Location;
    result.latitude =event.location.latitude;
    result.longitude=event.location.longitude;
    return this._http.get(apiUrl)
      .pipe(
        map( (response: any ) => {
          if (response.results.length >= 1) {
            const location = response.results[0];
            const components = location.components;
            if(components.city)
              result.city = components.city;
            else if (components.town)
              result.city = components.town;
            else if (components.municipality)
              result.city = components.municipality;
            result.street = components['house_number'] ? components['house_number']+' '+components.road : components.road;
            result.postalCode = components.postcode;
          } else {
            //Si la géolocalisation ne trouve pas d'événement, on met des valeurs par défaut ?
          }
          return result
        })
      );
  }
}
