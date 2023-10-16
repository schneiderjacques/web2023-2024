import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Observable, catchError, defaultIfEmpty, filter, map, mergeMap, of, throwError } from 'rxjs';
import { EventEntity } from './entities/event.entity';
import { EventDao } from './dao/event.dao';

@Injectable()
export class EventService {
    private _events : Event[];

  constructor(private readonly _eventDao: EventDao){
      this._events = [];
  }


  /**
   * Returns all existing event in the list
   *
   * @returns {Observable<EventEntity[] | void>}
   */
  // event.service.ts


  findAll = (): Observable<EventEntity[] | void> =>
  //Then console log the events
    this._eventDao.find().pipe(
      filter(Boolean),
      map((events) => (events || []).map((event) => new EventEntity(event))),
      defaultIfEmpty(undefined),
    );


  /**
   * Returns one event of the list matching id in parameter
   *
   * @param {string} id of the event
   *
   * @returns {Observable<EventEntity>}
   */
// user.service.ts


findOne = (id: string): Observable<EventEntity> =>
this._eventDao.findById(id).pipe(
  catchError((e) =>
    throwError(() => new UnprocessableEntityException(e.message)),
  ),
  mergeMap((user) =>
    !!user
      ? of(new EventEntity(user))
      : throwError(
          () => new NotFoundException(`User with id '${id}' not found`),
        ),
  ),
); 

}
