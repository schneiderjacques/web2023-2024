import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Allow,
  IsInstance,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
  ValidatePromise,
} from 'class-validator';
import { UpdateEventLocationDto } from './update-event-location.dto';
import { Type } from 'class-transformer';

export class UpdateEventDto {
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

  @ApiPropertyOptional({ name: 'address', description: 'Address' })
  @IsInstance(UpdateEventLocationDto)
  @ValidateNested({ each: true })
  @Type(() => UpdateEventLocationDto)
  location: UpdateEventLocationDto;

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
    description: 'the event color (it will be more usefull from the front)',
    example: '#903920',
  })
  @IsString()
  @IsNotEmpty()
  color: string;
}
