// src/fleet/services/hub.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { HubRepository } from '../repositories/hub.repository';
import { CreateHubDto } from '../dto/hub.dto';

@Injectable()
export class HubService {
    
  constructor(private readonly hubRepository: HubRepository) {}

  async createHub(dto: CreateHubDto) {
    return this.hubRepository.create(dto);
  }

  async getAllHubs() {
    return this.hubRepository.findAll();
  }

  async getHubById(id: string) {
    const hub = await this.hubRepository.findById(id);
    if (!hub) throw new NotFoundException('Hub not found');
    return hub;
  }

  async updateHub(id: string, dto: CreateHubDto) {
    return this.hubRepository.update(id, dto);
  }
}