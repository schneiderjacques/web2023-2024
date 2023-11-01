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


  getLatAndLng(query: string): Observable<LatLngTuple> {
    //encode query
    query = encodeURIComponent(query);
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${environment.geocode.apiKey}&no_annotations=1&language=fr&no_annotations=1&pretty=1&limit=1&address_only=1`;
    console.log(apiUrl);
    return this._http.get(apiUrl)
      .pipe(
        map( (response: any ) => {
          if (response.results.length >= 1) {
            const location = response.results[0];
            return [location.geometry.lat,location.geometry.lng]as LatLngTuple ;
          } else {
            return [0,0] as LatLngTuple;
          }
        }
        )

      );

  }


}
