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
  constructor(private _dialogRef: MatDialogRef<DialogComponent,Event>, @Optional() @Inject(MAT_DIALOG_DATA) private _event: Event) {
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
  }


  get event(): Event {
    return this._event;
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
