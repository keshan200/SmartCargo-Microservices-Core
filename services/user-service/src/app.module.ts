import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/users.module';
import { databaseConfig } from './modules/users/config/database.config';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { EurekaService } from './eureka.service';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
  imports: [

   ConfigModule.forRoot({ //env eka globally load karanwa
      isGlobal: true, 
   }),

   MongooseModule.forRootAsync({
      imports: [ConfigModule], //jwt moeule eka reg wenn kalin config module eka load wenna ona kiynne meken
      inject: [ConfigService], //config service eka inject karanwa
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
  
    UsersModule 
  ],

  controllers: [],
  providers: [EurekaService],
})
export class AppModule {}
