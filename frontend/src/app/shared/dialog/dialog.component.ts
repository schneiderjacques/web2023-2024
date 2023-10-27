import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Event} from "../types/event.type";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  /**
   * Component constructor
   */
  _event!: Event;
  isUpdating!: boolean;

  constructor(private _dialogRef: MatDialogRef<DialogComponent,Event>, @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    //event will be undefined when creating a new event
    if (!data.isUpdating && data.hasModel) {
      this._event = data.event;
      this.isUpdating = data.isUpdating;
    } else if (!data.isUpdating && !data.hasModel) {
      this._event = undefined as any;
      this.isUpdating = false;
    } else {
      this._event = data.event;
      this.isUpdating = data.isUpdating;
    }
  }

    get event(): Event {
      return this._event;
    }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
  }

  /**
   * Function to cancel the process and close the modal
   */
  onCancel(): void {
    this._dialogRef.close();
  }

  /**
   * Function to close the modal and send person to parent
   */
  /**
   * Function to close the modal and send person to parent
   */
  onSave(event: Event): void {
    this._dialogRef.close(event);
  }

}


