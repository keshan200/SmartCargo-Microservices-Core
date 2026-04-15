import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices'; // මෙතනින් ගන්න එක ලේසියි
import { Consignment, ConsignmentSchema } from './schemas/consignment.schema';
import { ConsignmentController } from './controllers/logistics-http.controller';
import { ConsignmentService } from './services/consigment.service';
import { ConsignmentRepository } from './repositories/consigment.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Consignment.name, schema: ConsignmentSchema },
    ]), 

   
    ClientsModule.register([
      {
        name: 'FLEET_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'fleet_queue',
        },
      },
      {
        name: 'SHIPMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'shipment_queue',
        },
      },
    ]),
  ], 
  controllers: [
    ConsignmentController,
  ],
  providers: [
    ConsignmentService,
    ConsignmentRepository,
  ],
  exports: [ConsignmentService],
})


export class LogisticsModule {}