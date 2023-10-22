import {Component, AfterViewInit, Input} from '@angular/core';
import * as L from 'leaflet';

import { environment  } from '../../environements/environement';
import {Event} from "../shared/types/event.type";
import {DivIcon, icon, LatLngTuple} from "leaflet";
import {buildMonths} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools";
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private mapLeaf! : L.Map;

  @Input()
  events :Event[] | undefined;


  private initMap(position : L.LatLngTuple): void {

    this.mapLeaf = L.map('map', {   // get the default location in the env
      center: position ,
      zoom: environment.mapConfig.defaultZoom
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: environment.mapConfig.maxZoom,
      minZoom: environment.mapConfig.minZoom,
    });

    tiles.addTo(this.mapLeaf);
  }


  constructor(private sharedService: SharedService) { }

  ngAfterViewInit(): void {
    navigator.geolocation.getCurrentPosition(
      position => {
      const { latitude, longitude } = position.coords;
      this.initMap([latitude,longitude] as L.LatLngTuple);
        if (this.events) {
          this.events.map(event => this.addMarker(event))
        }
      },
      () => {
        this.initMap(environment.mapConfig.center);
        if (this.events) {
          this.events.map(event => this.addMarker(event))
        }
      }
    )
    this.sharedService.getEventObservable().subscribe((event: Event) => {
      this.seeEvent(event);
    });


  }

  addMarker(event : Event) : void {
    const marker = L.marker([ event.location.latitude,event.location.longitude] as LatLngTuple,{icon : this.createIcon(event.color)});
    marker.addTo(this.mapLeaf);
    console.log( event);
  }

  seeEvent(event: Event){
    this.mapLeaf.flyTo([event.location.latitude,event.location.longitude] as LatLngTuple,environment.mapConfig.defaultZoom);
  }

  private createIcon(colorEvent : string) : DivIcon{
      const markerHtmlStyles = `
      background-color: ${colorEvent};
      width: 3rem;
      height: 3rem;
      display: block;
      left: -1.5rem;
      top: -1.5rem;
      position: relative;
      border-radius: 3rem 3rem 0;
      transform: rotate(45deg);
      border: 1px solid #FFFFFF`
      return L.divIcon({
      className: "my-custom-pin",
      iconAnchor: [0, 24],
      popupAnchor: [0, -36],
      html: `<span style="${markerHtmlStyles}" />`
    })

  }








}
