import { Component, OnInit } from '@angular/core';
import {Event} from "../shared/types/event.type";
import {EVENTS} from "../data/event.data";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../shared/dialog/dialog.component";
import {filter, map, mergeMap, of} from "rxjs";
import {SharedService} from "../shared/services/shared.service";
import {LocationService} from "../shared/services/location.service";


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
  constructor(private _dialog: MatDialog,private sharedService : SharedService, private locationService : LocationService){
    this._events = EVENTS;
    this._dialogStatus = 'inactive';
  }

  ngOnInit(): void {
    this._events = EVENTS;

    this.sharedService.getEventToAddObservable().subscribe((event: Event) => {
      this.locationService.reverseGeocode(event).
      subscribe(
        (event: Event) => {
          this.showDialog(event);
        }
      )


    });

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



  showDialog( event :Event): void {
    this._dialogStatus = 'active';

    // open modal
    this._eventDialog = this._dialog.open(DialogComponent, {
      width: '700px',
      disableClose: true,
      data: event
    });


    this._eventDialog.afterClosed().pipe(
      filter((event: Event | undefined) => !!event),
      map((event: Event | undefined) => {
          // delete obsolete attributes in original object which are not required in the API
          if (event) {
            // Create a new object without the optional properties
            const { id, userId, dateCreated, dateUpdated, ...newEvent } = event;
            return newEvent;
          }
          return undefined
      })
    ).subscribe((event : any) => {
      if (event) {
        console.log(event)
        this._events = this._events?.concat(event as  Event);
      }
    }, error => {
      this._dialogStatus = 'inactive';
    }, () => {
      this._dialogStatus = 'inactive';
    });
  }

}
