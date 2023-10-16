import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import * as Config from 'config';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
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
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
})
export class AppModule {}
