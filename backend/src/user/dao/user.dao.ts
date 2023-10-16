import { Injectable, Logger, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { catchError, from, map, mergeMap, Observable, of, tap, throwError } from 'rxjs';
import { User } from "../schemas/user.schema";
import { UserEntity } from "../entities/user.entity";
@Injectable()
export class UserDao{

  /**
   * Class constructor
   *
   * @param {Model<User>} _userModel instance of the model representing a User
   */
  constructor(
    @InjectModel(User.name)
    
    private  _userModel: Model<User>,
  ) {
    Logger.log('Name is : '+User.name)
  }

    /**
   * Call mongoose method, call toJSON on each result and returns UserModel[]
   *
   * @return {Observable<User[]>}
   */
// user.dao.ts
find = (): Observable<User[]> =>
    
    from(this._userModel.find({})).pipe(map((user) => 
    
      [].concat(user)

      ));





      /**
   * Returns one user of the list matching id in parameter
   *
   * @param {string} id of the user in the db
   *
   * @return {Observable<User | void>}
   */
  //Console.Log what is in the findbyid
      findById = (id: string): Observable<User | void> =>
      from(this._userModel.findById(id))

            /**
   * Returns one user of the list matching mail in parameter
   *
   * @param {string} mail of the user in the db
   *
   * @return {Observable<User | void>}
   */
  findByMail = (mail: string): Observable<User | void> =>
  from(this._userModel.findOne({ mail: mail }))
  
      
    

    
}