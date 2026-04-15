import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from './schemas/vehicle.schema';
import { VehicleService } from './service/vehicle.service';
import { VehicleController } from './controller/vehicle.controller';
import { VehicleRepository } from './repositories/vehicle.repository';
import { Transport } from '@nestjs/microservices/enums/transport.enum';
import { ClientsModule } from '@nestjs/microservices';
import { VehicleMessageController } from './controller/vehicle-message.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vehicle.name, schema: VehicleSchema }
    ]),

    ClientsModule.register([
      {
        name: 'FLEET_SERVICE_VEHICLE', 
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'fleet_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [
    VehicleController ,
    VehicleMessageController
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