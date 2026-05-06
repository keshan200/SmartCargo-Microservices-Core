import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Shipment, ShipmentDocument } from '../schemas/shipment.schema';

@Injectable()
export class ShipmentRepository {
  constructor(@InjectModel(Shipment.name) private shipmentModel: Model<ShipmentDocument>) {}

  async create(data: Partial<Shipment>): Promise<ShipmentDocument> {
    return new this.shipmentModel(data).save();
  }

  async findAll(): Promise<ShipmentDocument[]> {
    return this.shipmentModel.find().exec();
  }

  async findByTrackingId(trackingId: string): Promise<ShipmentDocument | null> {
  return this.shipmentModel.findOne({ tracking_id: trackingId }).exec();
 }

async updateStatus(id: string, status: string, driverId?: string): Promise<ShipmentDocument | null> {
  const updateData: any = { current_status: status };
  if (driverId) updateData.assigned_driver_id = new Types.ObjectId(driverId);
  
  return this.shipmentModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
}


async findByIds(ids: string[]): Promise<ShipmentDocument[]> {
    return this.shipmentModel.find({ 
      tracking_id: { $in: ids } 
    }).exec();
  }


  async updateMany(filter: any, update: any) {
    return this.shipmentModel.updateMany(filter, update).exec();
  }


async findWithPagination(filter: any, skip: number, limit: number) {
  return await this.shipmentModel
    .find(filter)
    .sort({ createdAt: -1 }) 
    .skip(skip)
    .limit(limit)
    .exec();
}

async count(filter: any) {
  return await this.shipmentModel.countDocuments(filter).exec();
}
}