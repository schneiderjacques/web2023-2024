import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { HttpInterceptor } from 'src/shared/interceptors/http.interceptor';
import { UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { Observable } from 'rxjs';

import { AuthGuard } from 'src/auth/auth.guard';
import { SignUpDto } from './dto/sign-up-user.dto';
import { Public } from '../shared/decorators/decorators';
import { HandlerParams } from 'src/shared/validators/handler-params';
import { ConfirmationService } from 'src/shared/confirmation/confirmation.service';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class UserController {
  /**
   * Class constructor
   * @param _userService
   */
  constructor(private readonly _userService: UserService) {}

  /**
   * Handler to answer to GET /people route
   *
   * @returns Observable<UserEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns an array of user',
    type: UserEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No user exists in database' })
  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth()
  @Get()
  findAll(): Observable<UserEntity[] | void> {
    const users = this._userService.findAll();
    return users;
  }

  /**
   * Handler to answer to GET /user/:id route
   *
   * @param {HandlerParams} params list of route params to take user id
   *
   * @returns Observable<UserEntity>
   */
  @ApiOkResponse({
    description: 'Returns the user for the given "id"',
    type: UserEntity,
  })
  @ApiNotFoundResponse({
    description: 'User with the given "id" doesn\'t exist in the database',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the User in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiOperation({ summary: 'Get one user' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') userId: string): Observable<UserEntity> {
    return this._userService.findOne(userId);
  }

  /**
   * Handler to answer to POST /user route
   * Create a user
   *
   * @param {SignUpDto} signUp data to create a user
   *
   * @returns {Observable<UserEntity>} The user created
   */
  @ApiOkResponse({
    description: 'The user has been successfully created',
    type: UserEntity,
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'SignUpDto',
    description: 'Data to create a new user',
    type: SignUpDto,
  })
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post()
  @Public()
  signUp(@Body() signUp: SignUpDto): Observable<UserEntity> {
    return this._userService.create(signUp);
  }
}
