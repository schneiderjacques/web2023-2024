import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class EventLocationDto {
  @ApiProperty({ name: 'city', description: 'City', example: 'Paris' })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({
    name: 'postalCode',
    description: 'Postal code',
    example: '61400',
  })
  @IsString()
  @IsOptional()
  postalCode: string;

  @ApiProperty({
    name: 'street',
    description: 'Street',
    example: 'Jewel Street',
  })
  @IsString()
  @IsOptional()
  street: string;

  @ApiProperty({
    name: 'locationDetails',
    description: 'it gives more details about where is located the event ',
    example: 'in the second floor',
  })
  @IsOptional()
  @IsString()
  locationDetails: string;

  @ApiProperty({
    name: 'longitude',
    description: 'longitude',
    example: '2.3522',
  })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @ApiProperty({
    name: 'latitude',
    description: 'latitude',
    example: '48.8566',
  })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;
}
