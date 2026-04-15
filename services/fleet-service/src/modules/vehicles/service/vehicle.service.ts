import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateVehicleDto } from '../dto/vehicle.dto';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { Types } from 'mongoose';
import { Vehicle, VehicleDocument } from '../schemas/vehicle.schema';


@Injectable()
export class VehicleService {

  constructor(private readonly vehicleRepository: VehicleRepository) {}


  async createVehicle(dto: CreateVehicleDto) {
    const vehicleData = {
      ...dto,
      current_driver_id: dto.current_driver_id ? new Types.ObjectId(dto.current_driver_id) : null,
      assigned_hub_id: dto.assigned_hub_id ? new Types.ObjectId(dto.assigned_hub_id) : null,
    };
    return await this.vehicleRepository.create(vehicleData as any);
  }
  

async findOne(id: string): Promise<VehicleDocument | null> {
    return await this.vehicleRepository.findById(id);
  }


  async getAllVehicles() {
    return await this.vehicleRepository.findAll();
  }

  
  async assignDriver(vehicleId: string, driverProfileId: string) {
    const vehicle = await this.vehicleRepository.findById(vehicleId);
    if (!vehicle) throw new NotFoundException('Vehicle not found');

    return await this.vehicleRepository.update(vehicleId, { 
      current_driver_id: driverProfileId 
    });
  }
}