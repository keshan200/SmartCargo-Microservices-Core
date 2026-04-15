// src/modules/consignment/repositories/consignment.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Consignment } from '../schemas/consignment.schema';

@Injectable()
export class ConsignmentRepository {
  constructor(@InjectModel(Consignment.name) private readonly model: Model<Consignment>) {}

  async create(data: any) {
    return await new this.model(data).save();
  }

  async findAll() {
    return await this.model.find().sort({ createdAt: -1 }).exec();
  }

  async findById(id: string) {
    return await this.model.findById(id).exec();
  }

  async updateStatus(id: string, status: string) {
    return await this.model.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }
}