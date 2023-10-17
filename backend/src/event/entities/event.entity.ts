import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventLocationEntity } from './event-location.entity';
import { Event } from '../schemas/event.schema';


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


  @ApiProperty({
    name: 'date',
    description: 'date in timestamp format',
    example: '101343600000',
  })

  @Expose()
  @Type(() => String)
  date: string;

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
    this.id = partial._id.toString();
    this.date = this.formatDateString(partial.date.toString());
    this.date_created = partial.date_created;
    this.date_updated = partial.date_updated;
    this.description = partial.description;
    this.start_time = partial.start_time;
    this.type = partial.type;
    this.location = partial.location;
    this.color = partial.color;
  }


  
  private formatDateString(inputDateStr) : string {
    const date = new Date(inputDateStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mois commence à 0 (janvier = 0)
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  }

}



