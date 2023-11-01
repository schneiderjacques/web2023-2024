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
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
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
  /**
   * Class constructor
   * @param {AuthService} authService instance of the AuthService
   * @param {UserService} _userService instance of the UserService
   * @param {ConfirmationService} confirmationService instance of the ConfirmationService
   */
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
    description: 'Incorrect mail/password couple',
  })
  @ApiUnprocessableEntityResponse({
    description: 'User mail must be confirmed before login',
  })
  @ApiBadRequestResponse({
    description: 'Password or mail is incorrect',
  })
  @ApiParam({
    name: 'SigninDto',
    required: true,
    description: 'Mail and password',
  })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: SignInDto,
  })
  @ApiBody({
    description: 'User information (mail, password)',
    type: SignInDto,
  })
  @ApiOperation({
    summary: 'Login the user',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  async login(@Body() signInDto: SignInDto): Promise<any> {
    return this.authService.signIn(signInDto.mail, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Get('profile')
  @ApiOkResponse({
    description: 'Returns the user profile',
    type: UserEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Token is invalid',
  })
  @ApiOperation({
    summary: 'Get the profile of the user',
  })
  @ApiParam({
    name: 'user',
    required: true,
    description: 'User token',
    type: UserEntity,
  })
  getProfile(@Request() user): Observable<UserEntity> {
    const { username } = user.user;
    return this._userService.findOneByMail(username);
  }

  @ApiResponse({
    status: 200,
    description: 'The user mail has been successfully confirmed.',
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
  @ApiOperation({
    summary: 'Confirm the user email',
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
