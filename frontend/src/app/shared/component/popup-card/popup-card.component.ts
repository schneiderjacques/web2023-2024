import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../types/event.type";
import {LocationService} from "../../services/location.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-popup-card',
  templateUrl: './popup-card.component.html',
  styleUrls: ['./popup-card.component.css']
})
export class PopupCardComponent implements OnInit{

  private _event! : Event;
  date: string = '';
  jour: string = '';
  constructor(private _locationService : LocationService,
              private _sharedService : SharedService) {

  }

  ngOnInit(): void {
    //La date sera au format : 14 décembre 2020
    this.date = new Date(this._event.date).toLocaleDateString('fr-FR', {year: 'numeric', month: 'long', day: 'numeric'});
    //Le jour sera au format : Lundi (première lettre en majuscule)
    this.jour = new Date(this._event.date).toLocaleDateString('fr-FR', {weekday: 'long'}).charAt(0).toUpperCase() + new Date(this._event.date).toLocaleDateString('fr-FR', {weekday: 'long'}).slice(1);

  }



  @Input()
  get event(): Event {
    return this._event;
  }
  set event(value: Event) {
    this._event = value;
  }



  redirectToGoogleMap(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        window.open(`https://www.google.com/maps/dir/${latitude},${longitude}/${this._event.location.latitude},${this._event.location.longitude}`, '_blank');
      },
      (error) => {
        this._sharedService.triggerShowModalInfo(true);
      })
  }


  addressInfo(): string {
    const addressParts = [];
    if (this.event.location.city) {
      addressParts.push(this.event.location.city);
    }
    if (this.event.location.postalCode) {
      addressParts.push(this.event.location.postalCode);
    }
    if (this.event.location.locationDetails) {
      addressParts.push(this.event.location.locationDetails);
    }
    if (addressParts.length > 0) {
      return addressParts.join(', ');
    } else {
      return "Informations sur l'adresse non disponibles";
    }
  }

}
