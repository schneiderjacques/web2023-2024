import { ApiProperty } from '@nestjs/swagger';
import {
  IsInstance,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EventLocationDto } from './create-event-location.dto';

export class CreateEventDto {
  @ApiProperty({
    name: '',
    description: 'the id user that he ',
    example: 'IA conf',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'date',
    description: 'the event date',
    example: '20-07-2000',
  })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    name: 'description',
    description: 'the event descrition',
    example: 'we will talk about apha-beta algorithm',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    name: 'time_start',
    description: 'the hour when the event starts',
    example: '20:00',
  })
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({
    name: 'location',
    description: 'location of the event',
  })
  @IsInstance(EventLocationDto)
  @ValidateNested()
  @Type(() => EventLocationDto)
  location: EventLocationDto;

  @ApiProperty({
    name: 'type',
    description: 'the event type',
    example: 'conference',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    name: 'color',
    description: 'The event color (it will be more usefull from the front)',
    example: '#903920',
  })
  @IsString()
  @IsNotEmpty()
  color: string;
}
