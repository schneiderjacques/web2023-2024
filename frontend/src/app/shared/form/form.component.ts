import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Event} from "../types/event.type";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Observable } from 'rxjs';
import { LocationService } from '../services/location.service';
import { Location } from '../types/event.type';
import { LatLng, LatLngTuple, latLng } from 'leaflet';
import {SharedService} from "../services/shared.service";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit{
  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<Event>;
  private _model: Event;



  //private readonly _form: FormGroup;
  private _form!: FormGroup;
  @Input() isUpdating!: boolean;
  text: string = "Ajouter un évènement";
  buttonText: string = "Ajouter";


  constructor(private sharedService : SharedService) {
    this._model = {} as Event;
    this._submit$ = new EventEmitter<Event>();
    this._cancel$ = new EventEmitter<void>();
  }
  ngOnInit(): void {
    this._form = this._buildForm();
    if (this.isUpdating) {
      this.text = "Modifier l'évènement";
      this.buttonText = "Modifier"
      //set form values
      console.log("Model is ")
      console.log(this.model.id)
      this._form.setValue({
        name: this.model.name,
        startTime: this.model.startTime,
        date: this.model.date,
        description: this.model.description,
        location: {
          street: this.model.location.street,
          city: this.model.location.city,
          postalCode: this.model.location.postalCode,
          locationDetails: this.model.location.locationDetails
        },
        type: this.model.type,
        color: this.model.color
      })
    }

    this.sharedService.getChangeLocation()
      .subscribe(
        (event) => {
            this._form.get('location')?.get('city')?.setValue(event.location.city);
            this._form.get('location')?.get('street')?.setValue(event.location.street);
            this._form.get('location')?.get('postalCode')?.setValue(event.location.postalCode);
        }
      )
  }


  /**
   * Sets private property _model
   */
  @Input()
  set model(model: Event) {
    this._model = model;
    console.log('open ')
    console.log(model);
    console.log('open ')

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
    event.location.street = this._form.get('location')?.get('street')?.value;
    event.location.city =this._form.get('location')?.get('city')?.value;
    event.location.postalCode =this._form.get('location')?.get('postalCode')?.value.toString();

    event.location.latitude =this.model.location.latitude;
    event.location.longitude =this.model.location.longitude;

    console.log(this.model.location.latitude +" "+this.model.location.longitude )
    if (this.model != undefined && !this.isUpdating) {
    this.model.location.locationDetails = event.location.locationDetails;
    event = { ... event,
              ... this.model} // merge model and event
    this._submit$.emit(event);
    } else if (this.isUpdating){
      event.id = this.model.id;
      event.location.locationDetails = this._form.value.location.locationDetails;
      this._submit$.emit(event);
    } else {
      event.location.locationDetails = this._form.value.location.locationDetails;
      this._submit$.emit(event);
    }
  }

  get form(): FormGroup {
    return this._form;
  }

  private _buildForm(): FormGroup {


    console.log(this.model)
    this._form = new FormGroup({
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
        street: new FormControl(
          {value : this.model != undefined ? this.model.location.street : '',  disabled: false},
          Validators.compose([Validators.required])),
        city: new FormControl(
          {value : this.model != undefined ? this.model.location.city : '',  disabled: false},
           Validators.compose([Validators.required])),
        postalCode: new FormControl(
          {value : this.model != undefined ? this.model.location.postalCode : '',  disabled: false},
          Validators.compose([Validators.required])),
        locationDetails: new FormControl('')
      })
      ,
      type: new FormControl(''),
      color: new FormControl('#e66465'),
    });
    return this._form;
  }
}
