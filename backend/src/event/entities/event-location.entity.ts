import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class EventLocationEntity {
  @Expose()
  street: string;

  @Expose()
  postalCode: string;

  @Expose()
  city: string;

  @Expose()
  locationDetails: string;
  
  @Expose()
  longitude : number

  @Expose()
  latitude : number
}