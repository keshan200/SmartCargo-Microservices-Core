import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from './schemas/vehicle.schema';
import { VehicleService } from './service/vehicle.service';
import { VehicleController } from './controller/vehicle.controller';
import { VehicleRepository } from './repositories/vehicle.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vehicle.name, schema: VehicleSchema }
    ]),
  ],
  controllers: [
    VehicleController 
  ],
  providers: [
    VehicleService, 
    VehicleRepository
  ],
  exports: [
    VehicleService,
    VehicleRepository
  ],
})
export class VehicleModule {}