import { Injectable, NotFoundException, Param, Put, UnprocessableEntityException } from '@nestjs/common';
import { Observable, catchError, defaultIfEmpty, filter, map, mergeMap, of, throwError } from 'rxjs';
import { EventEntity } from './entities/event.entity';
import { EventDao } from './dao/event.dao';
import { CreateEventDto } from './dto/create-event.dto';
import { UserService } from 'src/user/user.service';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  private _events : Event[];

  constructor(private readonly _eventDao: EventDao,private readonly _userService : UserService){
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
// event.service.ts

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

/**
 * create a new event :
 *
 * @param event to create
 * @param username the owner of the event to update 
 * @returns {Observable<EventEntity>}
 */
create = (eventDto: CreateEventDto, username: string): Observable<EventEntity> => {
  return this._getUserId(username).pipe(
    mergeMap((_userId) => {
      return of(eventDto).pipe(
        mergeMap((eventDto: CreateEventDto) => this._eventDao.save({
          ...eventDto,
          userId: _userId, // Now you have the user ID from _getUserId
          dateCreated: new Date().toISOString(),
          dateUpdated: new Date().toISOString(),
          date : new Date(eventDto.date).getTime().toString()
        } as CreateEventDto)),
        catchError((e) => throwError(() => new UnprocessableEntityException(e.message))),
        map((eventCreated) => new EventEntity(eventCreated))
      );
    })
  );
}

  private _getUserId(username : string) : Observable<string>{
    return this._userService.findOneByMail(username)
      .pipe(map((user)=> user.id));
  }


  /**
   * Function to parse date and return timestamp
   *
   * @param {string} date to parse
   * @returns {number} timestamp
   *
   * @private
   */
    private _parseDate = (date: string): number => {
      const dates = date.split('-');
      return new Date(dates[0] + '-' + dates[1] + '-' +dates[2]  ).getTime();
    };



/**
 * Deletes one event 
 *
 * @param {string} id of the person to delete
 * @param username the owner of the event to update 
 *
 * @returns {Observable<void>}
 */
delete = (id: string, username: string): Observable<void> =>
  this._getUserId(username).pipe(
    mergeMap((_userId) =>
      this._eventDao.findByIdAndUserIdAndRemove(id,_userId).pipe(
        catchError((e) =>
          throwError(() => new UnprocessableEntityException(e.message))
        ),
        mergeMap((eventDeleted) =>
          !!eventDeleted
            ? of(undefined)
            : throwError(
                () => new NotFoundException(`Event with id ='${id}' and userId ='${_userId}' not found`)
            )
        )
      )
    )
  );




   /**
   * Update a Event 
   *
   * @param {string} id of the event to update
   * @param event data to update
   * @param username the owner of the event to update 
   *
   * @returns {Observable<EventDaoEntity>}
   */
   update = (id: string, event: UpdateEventDto, username : string): Observable<EventEntity> =>
    
   this._getUserId(username).pipe(
      mergeMap((_userId) =>
        this._eventDao.findByIdAndUserIdAndUpdate(id,_userId,
          {...event,
            dateUpdated : new Date().toISOString(),
            date : new Date(event.date).getTime().toString()
          } as UpdateEventDto).pipe(
          catchError((e) =>
            throwError(() => new UnprocessableEntityException(e.message))
          ),
          mergeMap((eventUpdate) =>
            !!eventUpdate
              ? of(new EventEntity(eventUpdate))
              : throwError(
                  () => new NotFoundException(`Event with id ='${id}' and userId ='${_userId}' not found`)
                )
          )
        )
      )
    );


}

