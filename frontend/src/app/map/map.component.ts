import {
  Component,
  AfterViewInit,
  Input,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  ComponentRef
} from '@angular/core';
import * as L from 'leaflet';

import { environment  } from '../../environements/environement';
import {Event} from "../shared/types/event.type";
import {DivIcon, LatLngTuple, marker} from "leaflet";
import {SmallCardComponent} from "../shared/component/small-card/small-card.component";
import {PopupCardComponent} from "../shared/component/popup-card/popup-card.component";
import { SharedService } from '../shared/services/shared.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private mapLeaf! : L.Map;

  private _events :Event[] | undefined;
  private _isLoading!:Boolean;


  get isLoading(): Boolean {
    return this._isLoading;
  }
  @Input()
  set isLoading(value: Boolean) {
    this._isLoading = value;
  }

  private initMap(position : L.LatLngTuple): void {

    this.mapLeaf = L.map('map', {   // get the default location in the env
      center: position ,
      zoom: environment.mapConfig.defaultZoom,
      doubleClickZoom : false
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: environment.mapConfig.maxZoom,
      minZoom: environment.mapConfig.minZoom,
    });


    tiles.addTo(this.mapLeaf);

    this.mapLeaf.on('dblclick', (e: L.LeafletMouseEvent) => {
      const latitude = e.latlng.lat;
      const longitude = e.latlng.lng;
      this.addNewEvent(latitude, longitude);
    });
  }


  get events(): Event[] | undefined {
    return this._events;
  }

  @Input()
  set events(value: Event[] | undefined) {
    this._events = value;
    if(this.mapLeaf){
      this.refreshMap();
    }
  }

  addNewEvent(latitude: number, longitude: number) {
    let  event = {
      location: {
        longitude, // Assign the longitude value
        latitude, // Assign the latitude value
      },
    } as Event;
    this.sharedService.triggerAddEvent(event);
  }

  constructor(private sharedService: SharedService,
              private resolver: ComponentFactoryResolver,
              private injector: Injector,
              private appRef: ApplicationRef
              ) { }

  ngAfterViewInit(): void {

    navigator.geolocation.getCurrentPosition(
      position => {
      const { latitude, longitude } = position.coords;



      this.initMap([latitude,longitude] as L.LatLngTuple);
        if (this.events) {
          this.events.map(event => this.addMarker(event))
          this.createCurrentLocationMarker([latitude,longitude]).addTo(this.mapLeaf);
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

    const markerPopup = this.compilePopup(PopupCardComponent, (c: ComponentRef<SmallCardComponent>) => {
      c.instance.event = event;
    });
    marker.bindPopup(markerPopup);
    let start : number;
    marker.on('mouseover', function(e){
      e.target.openPopup();
      start = new Date().getTime();
    });

    this.sharedService.getEventDisplayAfterFlyMap().subscribe(
      (payload) => {
        if (payload.id === event.id){
          marker.openPopup();
          start = new Date().getTime();
        }
      }
    )
    marker.on('mouseout', function(e){
      var end = new Date().getTime();
      var time = end - start;
      console.log('Execution time: ' + time);
      if(time > 700){
        e.target.closePopup();
      }
    });
    marker.addTo(this.mapLeaf);
    console.log( event);
  }

  seeEvent(event: Event){
    this.mapLeaf.flyTo([event.location.latitude+0.0015,event.location.longitude] as LatLngTuple,environment.mapConfig.defaultZoom);
    this.sharedService.triggerEventDisplayAfterFlyMap(event);
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




  private createCurrentLocationMarker(position : L.LatLngTuple): L.Marker {
    const markerHtmlStyles = `
      width: 2rem;
      height: 2rem;
      display: block;
      background-color: rgb(232, 178, 178);
      border-radius: 50%;
      position: relative;
      animation: pulsation 1s infinite;
    `;

    const iconMarker = L.divIcon({
      className: "my-custom-pin",
      iconAnchor: [1.5, 1.5], // Ajustez les coordonnées pour le centrage
      popupAnchor: [0, 0], // Ajustez les coordonnées pour le centrage
      html: `
            <style>
              @keyframes pulsation {
                0% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.2);
                  opacity: 0.5;
                }
                100% {
                  transform: scale(1);
                }
              }
            </style>

          <span style="${markerHtmlStyles}">
            <span class="inner-circle" style="
                width: 20px;
                height: 20px;
                background-color: rgba(255,0,68,0.75);
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              "></span>
          </span>
         `
    });
    return L.marker(position,{icon : iconMarker});
  }

  private compilePopup( component: any, onAttach: any ): any {
    const compFactory: any = this.resolver.resolveComponentFactory(component);
    let compRef: any = compFactory.create(this.injector);

    if (onAttach)
      onAttach(compRef);

    this.appRef.attachView(compRef.hostView);
    compRef.onDestroy(() => this.appRef.detachView(compRef.hostView));

    let div = document.createElement('div');
    div.appendChild(compRef.location.nativeElement);
    return div;
  }

  private refreshMap(){
    this.clearMarkers();
    this._events?.map((event) => this.addMarker(event));
  }


  private clearMarkers() {
    // Loop through existing markers and remove them from the map.
    this.mapLeaf.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.mapLeaf.removeLayer(layer);
      }
    });
  }

  onFlyToMyCurrentPosition() {

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.refreshMap()
        this.createCurrentLocationMarker([latitude,longitude]).addTo(this.mapLeaf);
        this.mapLeaf.flyTo([latitude,longitude] as LatLngTuple,environment.mapConfig.defaultZoom);
      }
      )
  }
}
