import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Get, Param, Post, Query, UseGuards } from '@nestjs/common/decorators';
import { SignInDto } from 'src/user/dto/sign-in-user.dto';
import { Public } from '../decorators/decorators';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/user.schema';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/user/entities/user.entity';
import { ConfirmationService } from 'src/shared/confirmation/confirmation.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private _userService: UserService,
    private readonly confirmationService: ConfirmationService,
  ) {}

  /**
   * Retourne un token JWT si l'utilisateur existe et que le mot de passe est bon
   *
   * @param {SignInDto} signInDto Les données de connexion (mail et mot de passe)
   *
   * @returns {String} Le token JWT
   */
  @ApiOkResponse({
    description: 'Returns the JWT token',
    type: String,
  })
  @ApiNotFoundResponse({
    description: "User with mail doesn't exist in the database",
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'SigninDto',
    required: true,
    description: 'Mail and password',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  async login(@Body() signInDto: SignInDto): Promise<any> {
    return this.authService.signIn(signInDto.mail, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Get('profile')
  getProfile(@Request() req): Observable<UserEntity> {
    const { username } = req.user;
    return this._userService.findOneByMail(username);
  }

  @ApiResponse({
    status: 200,
    description: 'The user has been successfully confirmed.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid confirmation token.',
  })
  @ApiNoContentResponse({
    description: 'The user has been successfully confirmed.',
  })
  @ApiNotFoundResponse({
    description: "User with mail doesn't exist in the database",
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  @Public()
  async confirmEmail(@Query('token') token: string) {
    const userId = await this.confirmationService.verifyToken(token);
    if (userId) {
      await this.confirmationService.confirmUserEmail(userId);
      return { message: 'E-mail confirmé avec succès.' };
    } else {
      throw Error('Lien de Email expiré ou invalide');
    }
  }
}
