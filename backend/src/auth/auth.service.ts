import {
  Dependencies,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, lastValueFrom } from 'rxjs';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Dependencies(UserService, JwtService)
@Injectable()
/**
 * Auth Service
 * All the logic of the authentication is here
 *
 */
export class AuthService {
  /**
   * Class constructor
   * @param {UserService} userService instance of the UserService
   * @param {JwtService} jwtService instance of the JwtService
   */

  private readonly userService: UserService;
  private readonly jwtService: JwtService;

  constructor(userService: UserService, jwtService: JwtService) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  /**
   *
   * @param email
   * @param pass
   */
  async signIn(email: string, pass: string): Promise<any> {
    const user = await lastValueFrom(this.userService.findOneByMail(email));
    Logger.log('USER IS :' + user);
    //password is hashed in the database

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Your email or password is incorrect.');
    }

    if (user.isMailConfirmed === false) {
      throw new UnauthorizedException('Please confirm your email address.');
    }

    const payload = { sub: user.id, username: user.mail };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
