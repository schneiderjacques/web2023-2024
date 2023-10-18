import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EventLocationDto{
  
      @ApiProperty({ name: 'city', description: 'City', example: 'Paris' })
      @IsString()
      @IsNotEmpty()
      city: string;

      @ApiProperty({
        name: 'postalCode',
        description: 'Postal code',
        example: '61400',
      })

      @IsString()
      @IsNotEmpty()
      postalCode: string;
    
      @ApiProperty({
        name: 'street',
        description: 'Street',
        example: 'Jewel Street',
      })
      @IsString()
      @IsNotEmpty()
      street: string;
    
      @ApiProperty({
        name: 'locationDetails',
        description: 'it gives more details about where is located the event ',
        example: 'in the second floor',
      })
      @IsString()
      @IsNotEmpty()
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

