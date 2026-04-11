import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './config/database.config';
import { HubModule } from './modules/hubs/hubs.module';
import { EmployeeModule } from './modules/employee_profile/employee_profile.module';



@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri), 
    HubModule,
    EmployeeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
