import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import {Event} from "../shared/types/event.type";
import {EVENTS} from "../data/event.data";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../shared/dialog/dialog.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private _events : Event[] | undefined;

  // private property to store dialogStatus value
  private _dialogStatus: string;

  // private property to store dialog reference
  private _eventDialog : MatDialogRef<DialogComponent, Event> | undefined;
  constructor(private _authService: AuthService, private _dialog: MatDialog){
    this._dialogStatus = 'inactive';
  }

  ngOnInit(): void {
    this._events = EVENTS;
  }

  get events(): Event[] | undefined{
    return this._events;
  }


  /**
   * Returns private property _dialogStatus
   */
  get dialogStatus(): string {
    return this._dialogStatus;
  }



  showDialog(): void {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._eventDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true
    });

  }

}
