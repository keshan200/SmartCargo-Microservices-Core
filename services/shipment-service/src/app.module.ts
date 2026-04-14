import { Module } from '@nestjs/common';
import { databaseConfig } from './config/database.config';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ShipmentModule } from './modules/shipments/shipment.module';


@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri), 
    ShipmentModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
