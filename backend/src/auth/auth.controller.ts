import { Body, Controller, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Get, Post, UseGuards } from '@nestjs/common/decorators';
import { SignInDto } from 'src/user/dto/sign-in-user.dto';
import { Public } from '../decorators/decorators';

@Controller('auth')
@Public()
export class AuthController {

    constructor(private authService: AuthService){}
    
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    async login(@Body() signInDto: SignInDto): Promise<any> {
        return this.authService.signIn(signInDto.mail, signInDto.password);
    }
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }

}
