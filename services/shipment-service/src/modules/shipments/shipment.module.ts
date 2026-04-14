import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Shipment, ShipmentSchema } from './schemas/shipment.schema';
import { ShipmentController } from './controllers/shipment.controller';
import { ShipmentRepository } from './repositories/shipment.repository';
import { ShipmentService } from './services/shipment.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shipment.name, schema: ShipmentSchema }]),

    ClientsModule.register([
  {
    name: 'FLEET_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'fleet_queue',
    },
  },
]),
  ],

  //API endpoints clasees
  controllers: [ShipmentController],


  //buisenss logic classes
  providers: [
    ShipmentService, 
    ShipmentRepository],

    //tools
  exports: [ShipmentService],
})
export class ShipmentModule {}