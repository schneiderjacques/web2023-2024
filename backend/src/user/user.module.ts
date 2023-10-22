import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDao } from './dao/user.dao';
import { EmailService } from 'src/shared/email/email.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],

  controllers: [UserController],
  providers: [UserService, UserDao, Logger, {
    provide: 'APP_INTERCEPTOR',
    useClass: ClassSerializerInterceptor,


  },    EmailService],
  exports: [UserService],
})
export class UserModule {}
