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
import {DivIcon, LatLngTuple, marker} from "leaflet";
import {SharedService} from "../shared/services/shared.service";
import {LocationService} from "../shared/services/location.service";

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent implements  AfterViewInit {
  private map !:L.Map ;
  private _event !:Event;
  private _eventForm !:Event;


  private initMap(): void {
    var condition = (this._event.location.longitude && this._event.location.latitude)
    const position =  condition ? [this._event.location.latitude, this._event.location.longitude] as L.LatLngTuple: environment.mapConfig.center;
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

    if (this.event && condition) {
      this.addMarker(this.event)
    }
    tiles.addTo(this.map);

    this.map.on('dblclick', (e: L.LeafletMouseEvent) => {
      console.log(this.event)
      this.event.location.latitude = e.latlng.lat;
      this.event.location.longitude =  e.latlng.lng;

      this.locationService.reverseGeocode(this.event).
      subscribe(
        (location) => {
          this.eventForm.location.city = location.city
          this.eventForm.location.street = location.street
          this.eventForm.location.postalCode = location.postalCode
          this.changeLocation();
        }
      )
    });
  }

  constructor(private sharedService: SharedService,
              private resolver: ComponentFactoryResolver,
              private injector: Injector,
              private appRef: ApplicationRef,
              private locationService : LocationService
  ){ }

  ngAfterViewInit(): void {
    this.initMap();
  }

  get event(): Event {
    return this._event;
  }

  @Input()
  set event(value: Event) {
    if(!value){
      this.event = {
        location : {
        }
      } as Event;
    }else {
      this._event = value;
    }
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
    var condition = (this._event.location.longitude && this._event.location.latitude)
    if (this.map && condition ){
      L.marker([ event.location.latitude,event.location.longitude] as LatLngTuple,{icon : this.createIcon(this.eventForm.color)}).addTo(this.map);
    }

  }

  private changeLocation() {
    this.refresh()
    this.sharedService.triggerChangeLocation(this.eventForm)
  }

  private refresh() {
    this.clearMarkers();
    this.addMarker(this.event)
  }



  private clearMarkers() {
    if (this.map)
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });
  }

  get eventForm(): Event {
    return this._eventForm;
  }

  @Input()
  set eventForm(value: Event) {
    this._eventForm = value;
    this.refresh()
  }
}
