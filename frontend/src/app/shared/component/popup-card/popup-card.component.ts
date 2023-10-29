import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../types/event.type";

@Component({
  selector: 'app-popup-card',
  templateUrl: './popup-card.component.html',
  styleUrls: ['./popup-card.component.css']
})
export class PopupCardComponent implements OnInit{

  private _event! : Event;
  date: string = '';
  jour: string = '';
  constructor() {
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
}
