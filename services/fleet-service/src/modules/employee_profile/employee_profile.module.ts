import { Module } from '@nestjs/common';
import { EmployeeProfile, EmployeeProfileSchema } from './schemas/employee.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeController } from './controller/employee.controller';
import { EmployeeService } from './services/employee.service';
import { EmployeeRepository } from './repositories/employee.repositories';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: EmployeeProfile.name, schema: EmployeeProfileSchema }])
  ],
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    EmployeeRepository
  ],
  exports: [EmployeeService],
})
export class EmployeeModule {}