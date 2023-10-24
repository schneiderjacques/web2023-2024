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
import {DivIcon,  LatLngTuple} from "leaflet";
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

  @Input()
  events :Event[] | undefined;


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
              ) {}

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

    const markerPopup = this.compilePopup(PopupCardComponent, (c: ComponentRef<SmallCardComponent>) => {
      c.instance.event = event;
    });
    marker.bindPopup(markerPopup);
    let start : number;
    marker.on('mouseover', function(e){
      e.target.openPopup();
      start = new Date().getTime();
    });

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

}
