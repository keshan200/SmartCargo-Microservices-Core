import { Module } from '@nestjs/common';
import { EmployeeProfile, EmployeeProfileSchema } from './schemas/employee.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeController } from './controller/employee.controller';
import { EmployeeService } from './services/employee.service';
import { EmployeeRepository } from './repositories/employee.repositories';
import { EmployeeMesssageController } from './controller/employee.message.controller';
import { Hub , HubSchema } from '../hubs/schemas/hub.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmployeeProfile.name, schema: EmployeeProfileSchema },
      { name: Hub.name, schema: HubSchema },
    
    ])
  ],


  controllers: [EmployeeController,EmployeeMesssageController],
  providers: [
    EmployeeService,
    EmployeeRepository
  ],


  exports: [EmployeeService],
})


export class EmployeeModule {}