import { Dependencies, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, lastValueFrom } from 'rxjs';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Dependencies(UserService, JwtService)
@Injectable()
export class AuthService {

    private readonly userService: UserService;
    private readonly jwtService: JwtService;

    constructor(userService: UserService, jwtService: JwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await lastValueFrom(this.userService.findOneByMail(email));
        Logger.log('USER IS :' +  user);
        //password is hashed in the database
        
        if (!user || !(await bcrypt.compare(pass, user.password))) {
            throw new UnauthorizedException();
        }
        
        const payload = { sub: user.id, username: user.mail };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
