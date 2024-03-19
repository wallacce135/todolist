import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [

    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_CONNECT')
      }), 
      inject: [ ConfigService ]
  }),

    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}