import {Component, OnInit} from '@angular/core';
import {Event} from "../shared/types/event.type";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../shared/dialog/dialog.component";
import {filter, from, map, mergeMap, Observable} from "rxjs";
import {SharedService} from "../shared/services/shared.service";
import {LocationService} from "../shared/services/location.service";
import {EventService} from "../shared/services/event.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private _events : Event[] | undefined;

  // private property to store dialogStatus value
  private _dialogStatus: string;
  private _isLoading!: boolean;
  private _showInfoModal!: boolean;

  // private property to store dialog reference
  private _eventDialog : MatDialogRef<DialogComponent, Event> | undefined;
  constructor(private _dialog: MatDialog,
              private sharedService : SharedService,
              private locationService : LocationService,
              private _eventService :EventService){
    this._dialogStatus = 'inactive';
    this._isLoading = false;
    this._showInfoModal = false;
  }

  ngOnInit(): void {
    this._eventService
      .fetch()
      .subscribe({ next: (events: Event[]) => {
          this._events = events
        }
    });

    this.sharedService.getEventToAddObservable().subscribe((event: Event) => {
      this._isLoading = true;
      this.locationService.reverseGeocode(event).
      subscribe(
        (location) => {
          event.location = {
            ...event.location,
            ... location
          };
          this.showDialog(event);
          this._isLoading =false;
        }
      )
    });

    this.sharedService.getShowModalInfo().subscribe(
      (data) =>{
        let start : number;
        this._showInfoModal = data;
        this.timerToCloseTheAlert()
      }
    )

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


  get isLoading(): boolean {
    return this._isLoading;
  }



  showDialog( event :Event): void {
    this._dialogStatus = 'active';
    // open modal
    this._eventDialog = this._dialog.open(DialogComponent, {
      width: '700px',
      disableClose: true,
      data: {
        isUpdating: false,
        hasModel : true,
        event: event,
      }
    });

    this._eventDialog.afterClosed().pipe(
      filter((event: Event | undefined) => !!event),
      map((event: Event | undefined) => {
        if (event) {
          // Create a new object without the optional properties
          const { id, userId, dateCreated, dateUpdated, ...newEvent } = event;
          return newEvent as Event; // Cast newEvent to the Event type
        }
        return undefined;
      }),
      mergeMap((event: Event | undefined) => this._add(event))
    ).subscribe(
      (event: Event) => {
        if (event) {
          this._events = this._events?.concat(event);
        }
    }, error => {
        console.log("hello")
        this._dialogStatus = 'inactive';
    }, () => {
        this._dialogStatus = 'inactive';
    });
  }

  private _add(event : Event | undefined): Observable<Event> {
    return this._eventService.create(event as Event);
  }


  get showInfoModal(): boolean {
    return this._showInfoModal;
  }

  set showInfoModal(value: boolean) {
    this._showInfoModal = value;
  }

  private timerToCloseTheAlert() {
    let seconds: number = 3;
    const timer = setInterval(() => {
      seconds--;
      if (seconds <= 0) {
        clearInterval(timer);
        this._showInfoModal = false;
      }
    }, 1000);
  }
}
