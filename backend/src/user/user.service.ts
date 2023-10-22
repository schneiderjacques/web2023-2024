import {
  ConflictException,
    Injectable,
    Logger,
    NotFoundException,
    UnprocessableEntityException,
  } from '@nestjs/common';
import { User } from './user.types';
import { Observable, defaultIfEmpty, filter, from, map, tap } from 'rxjs';
import { UserDao } from './dao/user.dao';
import { UserEntity } from './entities/user.entity';
import { catchError, mergeMap, of, throwError } from 'rxjs';
import { SignUpDto } from './dto/sign-up-user.dto';
import { EmailService } from 'src/shared/email/email.service';


@Injectable()
export class UserService {
  //private property to store users
  private _user: User[];

  constructor(private readonly _userDao: UserDao, private readonly emailService: EmailService) {
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

  /**
   * Check if user already exists and add it in user list
   *
   * @param user to create
   *
   * @returns {Observable<UserEntity>}
   */
  create = (person: SignUpDto): Observable<UserEntity> =>
    of(person).pipe(
      mergeMap((newPreparedPerson: SignUpDto) =>
        this._userDao.save(newPreparedPerson),
      ),
      catchError((e) =>
        e.code === 11000
          ? throwError(
              () =>
                new ConflictException(
                  `User with mail '${person.mail}' already exists`,
                ),
            )
          : throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((personCreated) => {
        this.emailService.sendConfirmationEmail(personCreated.mail, personCreated._id);
        return new UserEntity(personCreated)
      }
        ),
    ); 


  /**
   * Send mail to user
   * 
   * @param user to send mail
   * 
   * @returns {boolean} true if mail is sent, false otherwise
   * 
   * @throws {Error} if user is undefined
   * */
  confirmUserEmail = (userId: string) => {
    this._userDao.findByIdAndUpdateMail(userId);
  }
}

