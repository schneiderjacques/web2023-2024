import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

import { environment  } from '../../environements/environement';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map! : L.Map;

  private initMap(): void {
    this.map = L.map('map', {
      //Use env variables here
      center: environment.mapConfig.center,
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
    this.initMap();
  }
}