import { Injectable, BadRequestException } from '@nestjs/common';
import { ShipmentRepository } from '../repositories/shipment.repository';
import { Types } from 'mongoose';
import { CreateShipmentDto } from '../dto/shipment.dto';


@Injectable()
export class ShipmentService {

  constructor(private readonly shipmentRepository: ShipmentRepository) {}

  async createShipment(dto: CreateShipmentDto) {
    // Generate Unique Tracking ID (SC + Current Timestamp + Random)
    const trackingId = `SC-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const shipmentData = {
      ...dto,
      sender_id: new Types.ObjectId(dto.sender_id),
      current_hub_id: new Types.ObjectId(dto.current_hub_id),
    };

    return await this.shipmentRepository.create(shipmentData as any);
  }





  async getShipmentByTracking(trackingId: string) {
    const shipment = await this.shipmentRepository.findByTrackingId(trackingId);
    if (!shipment) throw new BadRequestException('Invalid Tracking ID');
    return shipment;
  }
}