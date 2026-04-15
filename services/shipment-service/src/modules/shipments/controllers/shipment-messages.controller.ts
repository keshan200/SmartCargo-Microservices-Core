import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices/decorators/message-pattern.decorator";
import { Payload } from "@nestjs/microservices/decorators/payload.decorator";
import { ShipmentService } from "../services/shipment.service";

@Controller()
export class ShipmentMessageController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @MessagePattern('get_shipment_details')
  async handleGetShipmentDetails(@Payload() data: { ids: string[] }) {
    console.log('--- Logistics Requesting Shipment Data ---');
    

    const shipments = await this.shipmentService.getShipmentsByList(data.ids);

    if (!shipments) return [];

    return shipments; 
  }
}