import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hub, HubSchema } from './schemas/hub.schema';
import { HubService } from './service/hub.service';
import { EmployeeProfile, EmployeeProfileSchema } from '../employee_profile/schemas/employee.schema';
import { HubController } from './controller/hub.controller';
import { HubRepository } from './repositories/hub.repository';


@Module({
  imports: [
   
    MongooseModule.forFeature([
      { name: Hub.name, schema: HubSchema },
      { name: EmployeeProfile.name, schema: EmployeeProfileSchema }
    ]),
  ],
  controllers: [
    HubController
  ],
  providers: [
    HubService, 
    HubRepository
  ],
  exports: [
    HubService,
    HubRepository
  ],
})
export class HubModule {}