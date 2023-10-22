import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import * as Config from 'config';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { EmailService } from './shared/email/email.service';
@Module({
  imports: [

    AuthModule,
    UserModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri'), {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
           console.log('is connected');
        });
        connection._events.connected();
        return connection;
        },
    }),
    EventModule,
    
  ],
  providers: [
    {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
    EmailService],
})
export class AppModule {}
