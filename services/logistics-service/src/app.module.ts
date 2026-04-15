import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './modules/consignment/config/database.config';
import { LogisticsModule } from './modules/consignment/consignment.module';


@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri),
    LogisticsModule
  ],
  controllers: [
    
  ],
  providers: [],
})
export class AppModule {}
