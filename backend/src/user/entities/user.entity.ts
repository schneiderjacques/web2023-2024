import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '../schemas/user.schema';

@Exclude()
export class UserEntity {

  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '5eb5a8e8b370ff001fcd6d73',
  })
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  mail: string;

  @Expose()
  pseudo: string;

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
    console.log('Partial data:', partial);
    Object.assign(this, partial);
  }
  
}
