import {Component, EventEmitter} from '@angular/core';
import {Event} from "../types/event.type";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormControl, FormGroup, Validators} from "@angular/forms";


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
  //private readonly _form: FormGroup;
  private readonly _form: FormGroup;



  constructor() {
    this._add$ = new EventEmitter<Event>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
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


  get form(): FormGroup {
    return this._form;
  }



  private _buildForm(): FormGroup {
    return new FormGroup({
      name:  new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      startTime:  new FormControl('12:15'),
      date:  new FormControl('', Validators.compose([
        Validators.required
      ])),
      description:  new FormControl('', Validators.compose([
        Validators.required
      ])),

      location: new FormGroup({
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        postalCode: new FormControl('', Validators.required),
        locationDetails: new FormControl('', Validators.required),
      }),

      type: new FormControl(''),
      color: new FormControl('#e66465'),
    });
  }




}
