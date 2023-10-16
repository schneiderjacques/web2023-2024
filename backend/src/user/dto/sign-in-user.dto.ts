import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class SignInDto {
    @ApiProperty({
        name: 'mail',
        description: 'Mail of the account',
        example: 'test@gmail.com',
      })
      @IsString()
      @IsNotEmpty()
      @IsEmail()
    mail: string;


    @ApiProperty({
        name: 'password',
        description: 'Password of the account',
        example: 'test123',
      })
      @IsString()
      @IsNotEmpty()
    password: string;
}