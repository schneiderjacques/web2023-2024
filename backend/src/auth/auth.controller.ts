import { Body, Controller, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Get, Post, UseGuards } from '@nestjs/common/decorators';
import { UserEntity } from 'src/user/entities/user.entity';
import { User } from 'src/user/user.types';
import { SignInDto } from 'src/user/dto/sign-in-user.dto';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}
    
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() signInDto: SignInDto): Promise<any> {
        return this.authService.signIn(signInDto.mail, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }

}
