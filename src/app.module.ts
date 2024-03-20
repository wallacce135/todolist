import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { HttpModule } from '@nestjs/axios';
import { AuthMiddleware } from './middleware/auth.middlware';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './middleware/auth.controller';
import { AuthService } from './middleware/auth.service';
import { UserService } from './user/user.service';
import { User, UserSchema } from './user/user.schema';



@Module({
  imports: [

    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_CONNECT')
      }), 
      inject: [ ConfigService ]
  }),

    MongooseModule.forFeature([
      {
        name: User.name, schema: UserSchema
      }
    ]),

    TaskModule,
    UserModule,
    HttpModule,
    JwtModule.registerAsync(
      {
      useFactory: async (configService: ConfigService) =>  ({
          global: true,
          secret: configService.get<string>("SECRET"),
          signOptions: {expiresIn: '4h'}
      }),
      inject: [ConfigService]
  })
    
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, ConfigService, AuthService],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude('/auth/login')
    .forRoutes('/*')
  }
}
