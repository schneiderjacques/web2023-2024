import {
  AfterViewInit,
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  Input
} from '@angular/core';
import * as L from 'leaflet';
import {Event} from "../shared/types/event.type";
import {environment} from "../../environements/environement";
import {DivIcon, LatLngTuple} from "leaflet";
import {SharedService} from "../shared/services/shared.service";
@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent implements  AfterViewInit {
  private map !:L.Map ;
  private _event !:Event;
  private _color !:string;



  private initMap(): void {

    const position = this._event ? [this._event.location.latitude, this._event.location.longitude] as L.LatLngTuple: environment.mapConfig.center;
    this.map = L.map('map2', {
      center:position,
      zoom: 12,
      doubleClickZoom : false
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    if (this.event) {
      this.addMarker(this.event)
    }
    tiles.addTo(this.map);

    this.map.on('dblclick', (e: L.LeafletMouseEvent) => {
      const latitude = e.latlng.lat;
      const longitude = e.latlng.lng;

      this.changeLocation(latitude, longitude);
    });
  }

  constructor(private sharedService: SharedService,
              private resolver: ComponentFactoryResolver,
              private injector: Injector,
              private appRef: ApplicationRef
  ) {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }


  get event(): Event {
    return this._event;
  }
  @Input()
  set event(value: Event) {
    console.log(value.color);
    this._event = value;
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

  addMarker(event : Event) : void {
    const marker = L.marker([ event.location.latitude,event.location.longitude] as LatLngTuple,{icon : this.createIcon(this.color)});
    marker.addTo(this.map);
  }


  private changeLocation(latitude: number, longitude: number) {
    this.event.location.latitude = latitude;
    this.event.location.longitude = longitude;
    this.refresh()
  }

  private refresh() {
    this.clearMarkers();
    this.addMarker(this.event)
  }



  private clearMarkers() {
    // Loop through existing markers and remove them from the map.
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
  }


  get color(): string {
    return this._color;
  }
  @Input()
  set color(value: string) {
    this._color = value;
    this.refresh()
  }
}
