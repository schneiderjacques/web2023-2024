import {
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
  } from '@nestjs/common';
import { User } from './user.types';
import { Observable, defaultIfEmpty, filter, map, tap } from 'rxjs';
import { UserDao } from './dao/user.dao';
import { UserEntity } from './entities/user.entity';
import { catchError, mergeMap, of, throwError } from 'rxjs';


@Injectable()
export class UserService {

    //private property to store users

    private _user: User[];

    constructor(private readonly _userDao: UserDao){
        this._user = [];

    }


  /**
   * Returns all existing user in the list
   *
   * @returns {Observable<UserEntity[] | void>}
   */
// user.service.ts
findAll = (): Observable<UserEntity[] | void> =>
//Then console log the users
  this._userDao.find().pipe(
    filter(Boolean),
    map((users) => (users || []).map((user) => new UserEntity(user))),
    
    defaultIfEmpty(undefined),
  );



  /**
   * Returns one user of the list matching id in parameter
   *
   * @param {string} id of the user
   *
   * @returns {Observable<UserEntity>}
   */
findOne = (id: string): Observable<UserEntity> =>
this._userDao.findById(id).pipe(
  catchError((e) =>
    throwError(() => new UnprocessableEntityException(e.message)),
  ),
  mergeMap((user) =>
    !!user
      ? of(new UserEntity(user))
      : throwError(
          () => new NotFoundException(`User with id '${id}' not found`),
        ),
  ),
);
  /**
   * Returns one user of the list matching mail in parameter
   *
   * @param {string} mail of the user
   *
   * @returns {Observable<UserEntity>}
   */
findOneByMail = (mail: string): Observable<UserEntity> =>
this._userDao.findByMail(mail).pipe(
  catchError((e) =>
    throwError(() => new UnprocessableEntityException(e.message)),
  ),
  mergeMap((user) =>
    !!user
      ? of(new UserEntity(user))
      : throwError(
          () => new NotFoundException(`User with mail '${mail}' not found`),
        ),
  ),
);








}
