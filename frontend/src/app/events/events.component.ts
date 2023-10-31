import { Component } from '@angular/core';
import { Event } from '../shared/types/event.type';
import { OnInit } from '@angular/core';
import { EventService } from '../shared/services/event.service';
import { AuthService } from '../shared/services/auth.service';
import { UserType } from '../shared/types/user.type';
import Popper from 'popper.js';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, filter, map, mergeMap } from 'rxjs';
import { DeleteComponent } from '../shared/dialog/delete/delete.component';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],

})
export class EventsComponent implements OnInit {
  eventList: Event[] = [];
  isAscendingOrder: any = {
    nom: true,
    lieu: true,
    date: true,
    debut: true,
    genre: true,
  };
  private user!: UserType;

  private _eventDialog : MatDialogRef<DialogComponent, Event> | undefined;

  constructor(private _eventService: EventService, private _authService: AuthService, private _dialog: MatDialog) {
    this._authService.authenticatedUser().subscribe(
      (data: UserType) => {
        this.user = data;
        this._eventService.fetchByUserId(this.user.id).subscribe(
          { next: (events: Event[]) => this.eventList = events }
        )
      }
    )
  }

  createEvent() {
    this._eventDialog = this._dialog.open(DialogComponent, {
      width: '700px',
      disableClose: true,
      data: {
        isUpdating: false,
        hasModel : false,
      }
    });

    this._eventDialog.afterClosed().pipe(
      filter((event: Event | undefined) => !!event),
      map((event: Event | undefined) => {
        if (event) {
          const { id, userId, dateCreated, dateUpdated, ...newEvent } = event;
          return newEvent as Event;

        } else {
          return undefined;
        }
      }),
      mergeMap((event: Event | undefined) => this._add(event as Event))
    ).subscribe(result => {
      this._eventService.fetchByUserId(this.user.id).subscribe(
        { next: (events: Event[]) => this.eventList = events }
      )

    });

  }

  updateEvent(event: Event) {
    this._eventDialog = this._dialog.open(DialogComponent, {
      width: '700px',
      disableClose: true,
      data: {
        isUpdating: true,
        hasModel : true,
        event: event,
      },
    });

    this._eventDialog.afterClosed().pipe(
      filter((event: Event | undefined) => !!event),
      map((event: Event | undefined) => {
        if (event) {
          const { userId, dateCreated, dateUpdated, ...newEvent } = event;
          return newEvent as Event;

        } else {
          return undefined;
        }
      }),
      mergeMap((event: Event | undefined) => this._eventService.update(event as Event))
    ).subscribe(result => {
      this._eventService.fetchByUserId(this.user.id).subscribe(
        { next: (events: Event[]) => this.eventList = events }
      )

    });


  }

  private _add(event : Event | undefined): Observable<Event> {
    return this._eventService.create(event as Event);
  }

  ngOnInit(): void {
  }

  sortBy(item: string) {
    if (item == 'location' && this.isAscendingOrder[item]) {
      this.eventList = this.eventList.sort((a, b) => {
        if (a.location.city < b.location.city) {
          return -1;
        } else if (a.location.city > b.location.city) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (item == 'location' && !this.isAscendingOrder[item]) {
      this.eventList = this.eventList.sort((a, b) => {
        if (a.location.city > b.location.city) {
          return -1;
        } else if (a.location.city < b.location.city) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (this.isAscendingOrder[item]) {
      this.eventList = this.eventList.sort((a, b) => {
        if (a[item] < b[item]) {
          return -1;
        } else if (a[item] > b[item]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.eventList = this.eventList.sort((a, b) => {
        if (a[item] > b[item]) {
          return -1;
        } else if (a[item] < b[item]) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    this.isAscendingOrder[item] = !this.isAscendingOrder[item];
  }

  deleteEvent(event: Event) {
    const dialogRef = this._dialog.open(DeleteComponent, {
      width: '700px',
    });

    dialogRef.componentInstance.confirm$.subscribe(() => {
      this._eventService.delete(event.id).subscribe(
       // { next: (events: Event[]) => this.eventList = events }
       // close the dialog

       {
        next: () => {
          dialogRef.close();
          this._eventService.fetchByUserId(this.user.id).subscribe(
            { next: (events: Event[]) => this.eventList = events }
          )
        }
       }
      )
    }
    );
    dialogRef.componentInstance.cancel$.subscribe(() => {
      dialogRef.close();
    }
    );
  }
}
