import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventDao } from './dao/event.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './schemas/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],

  controllers: [EventController],
  providers: [
    EventService,
    Logger,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ClassSerializerInterceptor,
    },
    EventDao,
  ]
})
export class EventModule {}
