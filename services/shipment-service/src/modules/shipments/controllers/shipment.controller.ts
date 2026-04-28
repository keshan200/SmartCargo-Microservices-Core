import { ShipmentService } from '../services/shipment.service';
import { CreateShipmentDto } from '../dto/shipment.dto';
import {
  Controller,
  Post,
  Body,
  Headers,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('api/v1/shipments')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

 @Post('/create')
@UsePipes(new ValidationPipe({ whitelist: true }))
async create(
  @Body() createShipmentDto: CreateShipmentDto,
  @Headers() headers: any, // මුළු headers object එකම ගනින්
) {
 
  const userId = headers['x-user-id'] || headers['X-User-Id']; 
  console.log('--- Incoming Headers ---', headers);
  if (!userId) {
    console.log('Received Headers:', headers); // මේක දාලා log එක බලපන් මොනවද එන්නේ කියලා
    throw new BadRequestException(
      'User identification failed (Gateway Header missing)',
    );
  }

  return this.shipmentService.createShipment(createShipmentDto, userId);
}



}
