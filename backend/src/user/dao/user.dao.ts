import { Injectable, Logger, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { catchError, filter, from, map, mergeMap, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { User } from "../schemas/user.schema";
import { UserEntity } from "../entities/user.entity";
import { SignUpDto } from "../dto/sign-up-user.dto";
import { Sign } from "crypto";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserDao{
  /**
   * Class constructor
   *
   * @param {Model<User>} _userModel instance of the model representing a User
   */
  constructor(@InjectModel(User.name)private _userModel: Model<User>) {
    Logger.log('Name is : '+User.name);
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

  /**
   * Check if person already exists with index and add it in people list
   *
   * @param {SignUpDto} user to create
   *
   * @return {Observable<User>}
   */
  save = async (user: SignUpDto): Promise<User> =>
    //await user.password = await bcrypt.hash(user.password, 10);
    //Then save the user and return it for it to bo Observable<User>
    {
      const newUser = new User();
      newUser.mail = user.mail;
      newUser.pseudo = user.pseudo;
      newUser.password = await bcrypt.hash(user.password, 10);
      newUser.isMailConfirmed = false;
      return this._userModel.create(newUser);
      
    }

/**
 * Set isMailConfirmed to true of a user
 *
 * @param {string} user_id
 *
 */
findByIdAndUpdateMail = (user_id: string) => {
  from(
    this._userModel.findOneAndUpdate(
      { _id: user_id },
      { $set: { isMailConfirmed: true } },
      { new: true }
    )
  )
    .toPromise()
    .then(async (user) => {
      if (user) {
        console.log('User found and updated:', user);
      } else {
        console.log(`User with id '${user_id}' not found`);
        throw new NotFoundException(`User with id '${user_id}' not found`);
      }
    })
    .catch((err) => {
      console.log('Error:', err);
      throw new UnprocessableEntityException(err.message);
    });
};






   
   
    


  
      
    

    
}