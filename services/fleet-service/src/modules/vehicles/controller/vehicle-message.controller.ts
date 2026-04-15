// src/modules/vehicle/controllers/vehicle-message.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VehicleService } from '../service/vehicle.service';


@Controller()
export class VehicleMessageController {
  constructor(private readonly vehicleService: VehicleService) {}

  @MessagePattern('get_vehicle_info') 
  async handleGetVehicleInfo(@Payload() data: { vehicle_id: string }) {
    
    console.log('--- Request Received from Logistics ---');
    console.log('Searching for Vehicle ID:', data.vehicle_id);

    const vehicle = await this.vehicleService.findOne(data.vehicle_id);

    if (!vehicle) {
      return null; 
    }

    return vehicle
  }
}