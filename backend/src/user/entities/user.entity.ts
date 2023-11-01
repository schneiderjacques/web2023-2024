import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { BeforeInsert } from 'typeorm';

@Exclude()
export class UserEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '5eb5a8e8b370ff001fcd6d73',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'mail',
    description: 'Mail of the account',
    example: 'test@gmail.com',
  })
  @Expose()
  mail: string;

  @ApiProperty({
    name: 'pseudo',
    description: 'Pseudo of the account',
    example: 'test13',
  })
  @Expose()
  pseudo: string;

  @ApiProperty({
    name: 'isMailConfirmed',
    description: 'Is the mail confirmed',
    example: 'true',
  })
  @Expose()
  isMailConfirmed: boolean;

  @Exclude()
  password: string;

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<User>) {
    //Type 'ObjectId' is not assignable to type 'string'.
    this.id = partial._id.toString();
    this.mail = partial.mail;
    this.pseudo = partial.pseudo;
    this.isMailConfirmed = partial.isMailConfirmed;
    this.password = partial.password;
  }
}
