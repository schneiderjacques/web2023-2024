import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import {Event} from "../shared/types/event.type";
import {EVENTS} from "../data/event.data";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private _events : Event[] | undefined;
  constructor(private _authService: AuthService){ }

  ngOnInit(): void {
    this._events = EVENTS;
  }

  get events(): Event[] | undefined{
    return this._events;
  }

}
