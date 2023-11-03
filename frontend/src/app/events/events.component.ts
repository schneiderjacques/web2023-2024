import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { Event } from '../shared/types/event.type';
import { OnInit } from '@angular/core';
import { EventService } from '../shared/services/event.service';
import { AuthService } from '../shared/services/auth.service';
import { UserType } from '../shared/types/user.type';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, filter, map, mergeMap } from 'rxjs';
import { DeleteComponent } from '../shared/dialog/delete/delete.component';
import {MatPaginator} from "@angular/material/paginator";
import {end} from "@popperjs/core";
import {Browser} from "leaflet";
import safari = Browser.safari;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],

})


export class EventsComponent implements AfterViewInit {
  @ViewChild('paginator') paginator!: MatPaginator; // Replace 'MatPaginator' with your paginator type
  eventList: Event[] = [];
  eventListToDisplay: Event[] = [];
  currentPage: number;
  step: number;
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
    this.step = 5;
    this.currentPage = 0;
    this._authService.authenticatedUser().subscribe(
      (data: UserType) => {
        this.user = data;
        this._eventService.fetchByUserId(this.user.id).subscribe(
          { next: (events: Event[]) =>{
              this.eventList = events
              this.eventListToDisplay = this.eventList.slice(this.currentPage*this.step,this.currentPage*this.step+this.step)
            }
          }
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
        { next: (events: Event[]) =>
          {
            this.eventList = events
            this.eventArraySlice(this.currentPage)
          }
        }
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
        { next: (events: Event[]) => {
            this.eventList = events;
            this.eventArraySlice(this.currentPage)
          }
        }
      )

    });


  }

  private _add(event : Event | undefined): Observable<Event> {
    return this._eventService.create(event as Event);
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
    this.eventArraySlice(this.currentPage)
  }

  deleteEvent(event: Event) {
    const dialogRef = this._dialog.open(DeleteComponent, {
      width: '700px',
    });

    dialogRef.componentInstance.confirm$.subscribe(() => {
      this._eventService.delete(event.id).subscribe(
       {
        next: () => {
          dialogRef.close();
          this._eventService.fetchByUserId(this.user.id).subscribe(
            { next: (events: Event[]) =>{
                this.eventList = events
                this.eventArraySlice(this.currentPage)
              }
            }
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

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Évènements par page';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      let end = (page + 1) * pageSize;
      if (end >length){
        end = length
      }
      return `${start} - ${end} sur ${length}`;
    };
    this.paginator.page.subscribe(
      (data) =>{
        this.eventArraySlice(data.pageIndex)
      }
    )
  }


  eventArraySlice(indexPage : number){
    this.currentPage = indexPage;
    this.eventListToDisplay = this.eventList.slice(this.currentPage *this.paginator.pageSize, this.currentPage *this.paginator.pageSize+this.paginator.pageSize)
    if(this.eventListToDisplay.length == 0 ){
      this.currentPage--;
      this.eventListToDisplay = this.eventList.slice(this.currentPage *this.paginator.pageSize, this.currentPage *this.paginator.pageSize+this.paginator.pageSize)
    }
  }


}
