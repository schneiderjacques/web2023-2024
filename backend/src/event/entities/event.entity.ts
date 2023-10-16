import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventLocationEntity } from './event-location.entity';


@Exclude()
export class EventEntity {

  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '5eb5a8e8b370ff001fcd6d73',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @Expose()
  @Type(() => String)
  userId: string

  @Expose()
  @Type(() => String)
  date_created: string

  @Expose()
  @Type(() => String)
  date_updated: string

  @Expose()
  @Type(() => String)
  date: string

  @Expose()
  @Type(() => EventLocationEntity)
  location : EventLocationEntity

  @Expose()
  @Type(() => String)
  description : string
  
  @Expose()
  @Type(() => String)
  start_time: string
  @Expose()
  @Type(() => String)
  color : string

  @Expose()
  @Type(() => String)
  type: string

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */

  constructor(partial: Partial<Event>) {
    console.log('Partial data:', partial);
    Object.assign(this, partial);
  }

}



