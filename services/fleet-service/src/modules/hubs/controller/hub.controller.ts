// src/fleet/controllers/hub.controller.ts
import { Controller, Post, Get, Patch, Body, Param } from '@nestjs/common';

import { CreateHubDto } from '../dto/hub.dto';
import { HubService } from '../service/hub.service';
import { MessagePattern } from '@nestjs/microservices/decorators/message-pattern.decorator';

@Controller('api/v1/hubs')

export class HubController {
  constructor(private readonly hubService: HubService) {}

  @Post("/create")
  create(@Body() dto: CreateHubDto) {
    return this.hubService.createHub(dto);
  }

  @Get('/all')
  findAll() {
    return this.hubService.getAllHubs();
  }

  @Get('findone/:id')
  findOne(@Param('id') id: string) {
    return this.hubService.getHubById(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() dto: CreateHubDto) {
    return this.hubService.updateHub(id, dto);
  }


@MessagePattern({ cmd: 'get_hub_details' }) //req ekk awam res ekk yannna
async getHubDetails(hubId: string) {
  const hub = await this.hubService.getHubById(hubId);
  console.log("Fetching details for Hub:", hubId);
  console.log('Employee Hub Datass:', hub.hub_name, hub.latitude, hub.longitude);

  if (!hub) {
    console.error("Hub not found:", hubId);
    return null;
  }

  return { 
    lat: hub.latitude, 
    lng: hub.longitude ,
    name : hub.hub_name
  };
}


}