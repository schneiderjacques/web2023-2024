import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, from, map } from 'rxjs';

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
}




