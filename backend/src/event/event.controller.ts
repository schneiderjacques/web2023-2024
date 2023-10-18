import { Body, Controller, Delete, Get, Header, Param, Post, Put, Request } from '@nestjs/common';
import { Observable, of,  } from 'rxjs';
import { EventService } from './event.service';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { EventEntity } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { Any } from 'typeorm';
import { HandlerParams } from 'src/shared/validators/handler-params';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventController {


    constructor(private readonly _eventService: EventService) {}
    /**
   * Handler to answer to GET /event route
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
      description: 'Unique identifier of the Event in the database',
      type: String,
      allowEmptyValue: false,
    })
    @Get(':id')
    findOne(@Param('id') eventId: string): Observable<EventEntity> {
      return this._eventService.findOne(eventId);
    }


    /**
     * Handler to answer to POST /events route
     *
     * @param createEventDto data to create
     *
     * @returns Observable<EventEntity>
     */
    @ApiCreatedResponse({
      description: 'The event has been successfully created',
      type: EventEntity,
    })
    @ApiConflictResponse({
      description: 'The event already exists in the database',
    })
    @ApiBadRequestResponse({ description: 'Payload provided is not good' })
    @ApiBody({
      description: 'Payload to create a new event',
      type: CreateEventDto,
    })

    @Post()
    create(@Body() CreateEventDto : CreateEventDto,@Request() req): Observable<EventEntity> {
      const { username } = req.user;      
      return this._eventService.create(CreateEventDto,username);
    }


/**
   * Handler to answer to DELETE /events/:id route
   *
   * @param {HandlerParams} params list of route params to take events id
   *
   * @returns Observable<void>
   */
@ApiNoContentResponse({
  description: 'The event has been successfully deleted',
})
@ApiNotFoundResponse({
  description: 'Event with the given "id" doesn\'t exist in the database',
})

@ApiConflictResponse({
  description: 'If the event does not belong to the connected user\'s events list',
})

@ApiUnprocessableEntityResponse({
  description: "The request can't be performed in the database",
})

@ApiBadRequestResponse({ description: 'Parameter provided is not good' })
@ApiParam({
  name: 'id',
  description: 'Unique identifier of the event in the database',
  type: String,
  allowEmptyValue: false,
})
@Delete(':id')
delete(@Param() params: HandlerParams,@Request() req): Observable<void> {
  const { username } = req.user;      
  return this._eventService.delete(params.id,username);
}






  /**
   * Handler to answer to PUT /event/:id route
   *
   * @param {HandlerParams} params list of route params to take event id
   * @param updateEventDto data to update
   *
   * @returns Observable<EventEntity>
   */
  @ApiOkResponse({
    description: 'The event has been successfully updated',
    type: EventEntity,
  })
  @ApiNotFoundResponse({
    description: 'Evnet with the given "id" doesn\'t exist in the database',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBadRequestResponse({
    description: 'Parameter and/or payload provided are not good',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the event in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({ description: 'Payload to update a person', type: UpdateEventDto })
  @Put(':id')
  update(
    @Param() params: HandlerParams,
    @Body() updateEventDto: UpdateEventDto,
    @Request() req
  ): Observable<EventEntity> {
    const { username } = req.user;  
    return this._eventService.update(params.id, updateEventDto,username);
  }



 



}
