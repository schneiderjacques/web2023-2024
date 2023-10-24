import {Component, EventEmitter} from '@angular/core';
import {Event} from "../types/event.type";
import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {

  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;
  // private property to store add$ value
  private readonly _add$: EventEmitter<Event>;
  private _color: string;
  selectedTimes: any;
  pickerC: any;

  constructor() {
    this._add$ = new EventEmitter<Event>();
    this._cancel$ = new EventEmitter<void>();
    this._color = "";
  }


  set color(value: string) {
    this._color = value;
  }

  get color(): string {
    return this._color;
  }

  /**
   * Function to emit event to cancel process
   */
  cancel() {
    this._cancel$.emit();

  }


  /**
   * Function to emit event to add new person
   * */
  add() {
    this._add$.emit({} as Event);
  }




}
