// src/fleet/repositories/hub.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hub } from '../schemas/hub.schema';

@Injectable()
export class HubRepository {
  constructor(@InjectModel(Hub.name) private hubModel: Model<Hub>) {}

  async create(data: any): Promise<Hub> {
    return new this.hubModel(data).save();
  }

  async findAll(): Promise<Hub[]> {
    return this.hubModel.find().exec();
  }


async findById(id: string): Promise<Hub | null> {
  return this.hubModel.findById(id).exec();
}

 async update(id: string, data: any): Promise<Hub | null> {
    return this.hubModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.hubModel.findByIdAndDelete(id).exec();
  }
}