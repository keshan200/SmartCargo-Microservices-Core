import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, UpdateQuery } from 'mongoose';
import { Vehicle, VehicleDocument } from '../schemas/vehicle.schema';

@Injectable()
export class VehicleRepository {

  constructor(
    @InjectModel(Vehicle.name) private readonly vehicleModel: Model<VehicleDocument>,
  ) {}


  async create(data: Partial<Vehicle>): Promise<VehicleDocument> {
    const newVehicle = new this.vehicleModel(data);
    return await newVehicle.save();
  }


  async findAll(): Promise<VehicleDocument[]> {
    return await this.vehicleModel.find().populate('current_driver_id').exec();
  }

  async update(id: string, updateData: UpdateQuery<VehicleDocument>): Promise<VehicleDocument | null> {
    return await this.vehicleModel.findByIdAndUpdate(
      new Types.ObjectId(id),
      { $set: updateData },
      { new: true, runValidators: true }
    ).exec();
  }


  async findById(id: string): Promise<VehicleDocument | null> {
    return await this.vehicleModel.findById(new Types.ObjectId(id)).exec();
  }
}