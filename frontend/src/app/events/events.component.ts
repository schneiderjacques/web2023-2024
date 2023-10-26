import { Component } from '@angular/core';
import { Event } from '../shared/types/event.type';
import { OnInit } from '@angular/core';
import { EVENTS } from '../data/event.data';
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

  constructor() {}

  ngOnInit(): void {
    this.eventList = EVENTS;
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
  editEvent(event: Event) {
    console.log(event);
  }
}
