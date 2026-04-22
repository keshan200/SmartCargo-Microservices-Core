import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './config/database.config';
import { HubModule } from './modules/hubs/hubs.module';
import { EmployeeModule } from './modules/employee_profile/employee_profile.module';
import { Vehicle } from './modules/vehicles/schemas/vehicle.schema';
import { VehicleModule } from './modules/vehicles/vehicles.module';
import { EurekaService } from './eureka.service';



@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri), 
    HubModule,
    EmployeeModule,
    VehicleModule
  ],
  controllers: [],
  providers: [EurekaService],
})
export class AppModule {}
