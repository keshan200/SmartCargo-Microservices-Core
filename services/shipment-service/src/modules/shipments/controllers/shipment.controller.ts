import { Controller, Post, Get, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ShipmentService } from '../services/shipment.service';
import { CreateShipmentDto } from '../dto/shipment.dto';


@Controller('api/v1/shipments')
export class ShipmentController {

  constructor(private readonly shipmentService: ShipmentService) {}

  @Post("/create")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createShipmentDto: CreateShipmentDto) {

  return this.shipmentService.createShipment(createShipmentDto);
  }

  @Get('find/:trackingId')
  async findOne(@Param('trackingId') trackingId: string) {
    return this.shipmentService.getShipmentDetails(trackingId);
  }
}