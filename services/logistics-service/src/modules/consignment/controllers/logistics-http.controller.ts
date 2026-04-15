
import { Controller, Post, Get, Body, Patch, Param } from '@nestjs/common';
import { CreateConsignmentDto } from '../dto/consignment.dto';
import { ConsignmentService } from '../services/consigment.service';


@Controller('api/v1/logistics')
export class ConsignmentController {

  constructor(private readonly service: ConsignmentService) {}


  @Post('/create')
  async create(@Body() dto: CreateConsignmentDto) {
    return await this.service.createConsignment(dto);
  }

  @Get('/all')
  async findAll() {
    return await this.service.getAll();
  }

  @Patch('/update/status/:id')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return await this.service.updateStatus(id, status);
  }
}