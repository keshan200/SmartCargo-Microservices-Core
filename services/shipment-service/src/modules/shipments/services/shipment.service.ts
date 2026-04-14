import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { CreateShipmentDto } from '../dto/shipment.dto';
import { ShipmentRepository } from '../repositories/shipment.repository';
import { v4 as uuidv4 } from 'uuid';
import { Types } from 'mongoose';
import { PricingConfig } from '../../../config/pricing.config';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ShipmentService {
  constructor(
     @Inject('FLEET_SERVICE') private client : ClientProxy,
     private readonly shipmentRepository: ShipmentRepository

  ) {}



private calculateCost(weight: number, distance: number, serviceType: string): number {
    // දැන් ගණන් ටික එන්නේ Config ෆයිල් එකෙන්
    const { base_price, price_per_kg, price_per_km, express_multiplier } = PricingConfig;

    let total = base_price + (weight * price_per_kg) + (distance * price_per_km);

    if (serviceType === 'EXPRESS') {
      total = total * express_multiplier;
    }

    return Math.round(total);
  }


  private getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // KM
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }



  async createShipment(dto: CreateShipmentDto) {
    try {
      // A. Fleet Service එකෙන් හබ් එකේ විස්තර ඉල්ලීම (RabbitMQ Request-Response)
      const hubDetails = await lastValueFrom(
        this.client.send({ cmd: 'get_hub_details' }, dto.current_hub_id),
      );

      if (!hubDetails) {
        throw new BadRequestException('Hub details not found in Fleet Service');
      }

      //  හබ් එකේ සිට ඩිලිවරි ලොකේෂන් එකට දුර මැනීම
      const distance = this.getDistance(
        hubDetails.lat,
        hubDetails.lng,
        dto.delivery_lat,
        dto.delivery_lng,
      );

      //  ගාස්තුව කැල්කියුලේට් කිරීම
      const totalCost = this.calculateCost(dto.weight_kg, distance, dto.service_type);

      //  Tracking ID සහ QR Data සෑදීම
      const trackingId = `SC-${Date.now()}-${uuidv4().substring(0, 4).toUpperCase()}`;

      //  Database එකට අවශ්‍ය විදිහට Object එක සකස් කිරීම
      const shipmentData = {
        ...dto,
        tracking_id: trackingId,
        qr_code: trackingId, // passe set karagn puluwan
        total_cost: totalCost,
        sender_id: new Types.ObjectId(dto.sender_id),
        current_hub_id: new Types.ObjectId(dto.current_hub_id),
      };

      // F. සේව් කරලා ප්‍රතිඵලය ලබා දීම
      return await this.shipmentRepository.create(shipmentData as any);
      
   } catch (error: unknown) {
  if (error instanceof Error) {
    throw new BadRequestException(`Failed to create shipment: ${error.message}`);
  }
  throw new BadRequestException('An unknown error occurred');
}
  }




  async getShipmentDetails(trackingId: string) {
    const shipment = await this.shipmentRepository.findByTrackingId(trackingId);
    if (!shipment) throw new BadRequestException('Invalid Tracking ID');
    return shipment;
  }
}