import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";


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
        pattern: '^[a-zA-Z0-9_-]{3,16}$',
      })
      @IsString()
      @IsNotEmpty()
      @Matches(/^[a-zA-Z0-9_-]{3,16}$/, {
        message: 'Pseudo should be between 3 and 16 characters and can only contain letters, numbers, underscores and dashes',
      })
    pseudo: string;

    @ApiProperty({
        name: 'password',
        description: 'Password of the account',
        example: 'Test1234',
        pattern: '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$',
      })
      @IsString()
      @IsNotEmpty()
      @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/, {
        message: 'Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number',
      })
    password: string;
  



}
