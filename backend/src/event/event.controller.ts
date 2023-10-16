import { Controller, Get, Param } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { EventService } from './event.service';
import { HandlerParams } from 'src/shared/validators/handler-params';
import { ApiBadRequestResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { EventEntity } from './entities/event.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('events')
export class EventController {


    constructor(private readonly _eventService: EventService) {}
    /**
   * Handler to answer to GET /people route
   *
   * @returns Observable<UserEntity[] | void>
   */
    @ApiOkResponse({
      description: 'Returns an array of event',
      type: EventEntity,
      isArray: true,
    })
    @ApiNoContentResponse({ description: 'No envent exists in database' })
    @Get()
    findAll(): Observable<EventEntity[] | void> {
      const events = this._eventService.findAll();
      return events;
    }
 


      
    /**
   * Handler to answer to GET /events/:id route
   *
   * @param {HandlerParams} params list of route params to take event id
   *
   * @returns Observable<EventEntity>
   */
        @ApiOkResponse({
          description: 'Returns the event for the given "id"',
          type: EventEntity,
        })
        @ApiNotFoundResponse({
          description: 'Event with the given "id" doesn\'t exist in the database',
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
        findOne(@Param('id') userId: string): Observable<EventEntity> {
          return this._eventService.findOne(userId);
        }

}
