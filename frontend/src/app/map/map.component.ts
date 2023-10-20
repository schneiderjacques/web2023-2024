import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

import { environment  } from '../../environements/environement';
import { tap } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map! : L.Map;

  private initMap(position : L.LatLngTuple): void {

    this.map = L.map('map', {   // get the default location in the env
      center: position ,
      zoom: environment.mapConfig.defaultZoom
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: environment.mapConfig.maxZoom,
      minZoom: environment.mapConfig.minZoom,
    });

    tiles.addTo(this.map);
  }

  constructor() { }

  ngAfterViewInit(): void {
    navigator.geolocation.getCurrentPosition(
      position => {
      const { latitude, longitude } = position.coords;
      this.initMap([latitude,longitude] as L.LatLngTuple);
      },
      (error) => {
        this.initMap(environment.mapConfig.center);
      }
    )
  }
}
