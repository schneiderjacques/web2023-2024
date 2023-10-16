import { ClassSerializerInterceptor, Controller, Get, Logger, Param } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { HttpInterceptor } from 'src/interceptors/http.interceptor';
import { UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { Observable } from 'rxjs';
import { HandlerParams } from './validators/handler-params';

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
  @Get(':id')
  findOne(@Param('id') userId: string): Observable<UserEntity> {
    return this._userService.findOne(userId);
  }
  




}