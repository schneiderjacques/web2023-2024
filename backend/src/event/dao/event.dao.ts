import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, from, map, mergeMap } from 'rxjs';
import { CreateEventDto } from '../dto/create-event.dto';
import { Event } from '../schemas/event.schema';

@Injectable()
export class EventDao {

  /**
   * Class constructor
   *
   * @param {Model<Event>} _eventModel instance of the model representing a Event
   */
  constructor(@InjectModel(Event.name) private  _eventModel: Model<Event>){
    Logger.log('Name is : '+Event.name)
  }

  /**
  * Call mongoose method, call toJSON on each result and returns EventModel[]
  *
  * @return {Observable<Event[]>}
  */
  //event.dao.ts
  find = (): Observable<Event[]> =>
    from(this._eventModel.find({}).lean()).pipe(map((event) => 
      [].concat(event)
    ));

  /**
   * Returns one user of the list matching id in parameter
   *
   * @param {string} id of the user in the db
   *
   * @return {Observable<Event | void>}
   */
  //Console.Log what is in the findbyid
  findById = (id: string): Observable<Event | void> =>
  from(this._eventModel.findById(id).lean())



  /**
   * Find the event liked to the userId and remove it 
   *
   * @param {string} id the event id 
   *
   * 
   * @param {string} userId the user id 
   *
   * @return {Observable<User | void>}
   */
  findByIdAndUserIdAndRemove = (id : string, userId): Observable<Event | void> =>
    from(this._eventModel.findOneAndRemove({ _id: id , userId: userId}))

  /**
   * Save a new event
   * 
   * @param {CreateEventDto} event to create
   *
   * @return {Observable<Event>}
   */
  save = (event:  CreateEventDto): Observable<Event> =>
    from(new this._eventModel(event).save());

  /**
     * Delete a event 
     *
     * @param {string} id
     *
     * @return {Observable<Event | void>}
  */
  findByIdAndRemove = (id: string): Observable<Event | void> =>
    from(this._eventModel.findByIdAndRemove(id));
}




