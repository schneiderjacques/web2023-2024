import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Event} from "../types/event.type";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<Event>;
  private _model: Event;

  //private readonly _form: FormGroup;
  private readonly _form: FormGroup;


  constructor() {
    this._model = {} as Event;
    this._submit$ = new EventEmitter<Event>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
  }



  /**
   * Sets private property _model
   */
  @Input()
  set model(model: Event) {
    this._model = model;
  }

  /**
   * Returns private property _model
   */
  get model(): Event {
    return this._model;
  }



  /**
   * Returns private property _cancel$
   */
  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  /**
   * Returns private property _submit$
   */
  @Output('submit')
  get submit$(): EventEmitter<Event> {
    return this._submit$;
  }



  /**
   * Function to emit event to cancel process
   */
  cancel(): void {
    this._cancel$.emit();
  }

  /**
   * Function to emit event to submit form and event
   */
  submit(event: Event): void {
    this._submit$.emit(event);
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
        street: new FormControl({value : '',  disabled: true}),
        city: new FormControl({value : '',  disabled: true}),
        postalCode: new FormControl({value : '',  disabled: true}),
        locationDetails: new FormControl(''),
      }),

      type: new FormControl(''),
      color: new FormControl('#e66465'),
    });
  }




}
