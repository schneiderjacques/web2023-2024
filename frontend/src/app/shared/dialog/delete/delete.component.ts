import { Component, EventEmitter, Output } from '@angular/core';
import { Event } from '../../types/event.type';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  private readonly _confirm$: EventEmitter<Event>;
  private readonly _cancel$: EventEmitter<Event>;

  constructor() {
    this._confirm$ = new EventEmitter<Event>();
    this._cancel$ = new EventEmitter<Event>();
  }

  @Output ('confirm') get confirm$(): EventEmitter<Event> {
    return this._confirm$;
  }

  @Output ('cancel') get cancel$(): EventEmitter<Event> {
    return this._cancel$;
  }

  confirm(): void {
    this._confirm$.emit();
  }

  cancel(): void{
    this._cancel$.emit();
  }

  

}
