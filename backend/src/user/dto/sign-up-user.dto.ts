import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";
import * as bcrypt from 'bcrypt';
import { BeforeInsert } from "typeorm";
import { Exclude } from "class-transformer";

export class SignUpDto {
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
        name: 'pseudo',
        description: 'Pseudo of the account',
        example: 'test13',
      })
      @IsString()
      @IsNotEmpty()
    pseudo: string;

    @ApiProperty({
        name: 'password',
        description: 'Password of the account',
        example: 'test123',
      })
      @IsString()
      @IsNotEmpty()
    password: string;
  



}
