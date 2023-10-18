import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";


export class UpdateEventLocationDto{
  
      @ApiProperty({ name: 'city', description: 'City', example: 'Paris' })
      @IsOptional()
      @IsString()
      @IsNotEmpty()
      city: string;

      @ApiProperty({
        name: 'postalCode',
        description: 'Postal code',
        example: '61400',
      })

      @IsOptional()
      @IsString()
      @IsNotEmpty()
      postalCode: string;
    

      @IsOptional()
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

      @IsOptional()
      @IsString()
      @IsNotEmpty()
      locationDetails: string;


      @ApiProperty({
        name: 'longitude',
        description: 'longitude',
        example: '2.3522',
      })
      @IsOptional()
      @IsNumber()
      @IsNotEmpty()
      longitude: number;

      @IsOptional()
      @ApiProperty({
        name: 'latitude',
        description: 'latitude',
        example: '48.8566',
      })    
      @IsNumber()
      latitude: number;
}

