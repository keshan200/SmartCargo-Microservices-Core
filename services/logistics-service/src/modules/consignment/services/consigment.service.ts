// src/modules/consignment/services/consignment.service.ts
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';
import { ConsignmentRepository } from '../repositories/consigment.repository';
import { CreateConsignmentDto } from '../dto/consignment.dto';

@Injectable()
export class ConsignmentService {
  constructor(

    private readonly repo: ConsignmentRepository,
    @Inject('FLEET_SERVICE') private readonly fleetClient: ClientProxy,
     @Inject('SHIPMENT_SERVICE') private readonly shipmentClient: ClientProxy, 
  ) {}



async createConsignment(dto: CreateConsignmentDto) {
  // 1. Fleet එකෙන් වාහනේ ගන්නවා
  const vehicle = await firstValueFrom(
    this.fleetClient.send('get_vehicle_info', { vehicle_id: dto.vehicle_id })
  );
  if (!vehicle) throw new BadRequestException('Vehicle not found!');

  // 2. Shipment details ටික ඔක්කොම ගන්නවා
  const shipments: any[] = await firstValueFrom(
    this.shipmentClient.send('get_shipment_details', { ids: dto.shipment_ids })
  );

  if (!shipments || shipments.length === 0) {
    throw new BadRequestException('No shipments found for the given IDs!');
  }

  // බර එකතු කරගමු
  // ConsignmentService ඇතුළේ මෙහෙම ලියපන්:
const totalWeight = shipments.reduce((sum, s) => {
    const w = Number(s.weight_kg) || 0; 
    return sum + w;
}, 0);

console.log('Calculated Total Weight:', totalWeight); // 👈 මේක දාලා ලොග් එක බලපන්!

  // උදාහරණයක් විදියට fragility check එකක් කරන්න ඕනේ නම්:
  const hasFragileItems = shipments.some(s => s.is_fragile === true);

  // 4. Weight Validation
  if (totalWeight > vehicle.capacity_kg) {
    throw new BadRequestException(
      `Overweight! Total Weight: ${totalWeight}kg, Vehicle Max: ${vehicle.capacity_kg}kg.`
    );
  }

  // 5. DB එකට සේව් කරනවා
  return await this.repo.create({
    ...dto,
    total_weight_kg: totalWeight,
    // පස්සේ ඕනේ නම් මෙතනට hasFragileItems වගේ දේවල් පවා දාන්න පුළුවන්
  });
}



  async updateStatus(id: string, status: string) {
    const valid = ['CREATED', 'DISPATCHED', 'ARRIVED', 'COMPLETED'];
    if (!valid.includes(status)) throw new BadRequestException('Invalid Status!');
    return await this.repo.updateStatus(id, status);
  }

  async getAll() {
    return await this.repo.findAll();
  }
}