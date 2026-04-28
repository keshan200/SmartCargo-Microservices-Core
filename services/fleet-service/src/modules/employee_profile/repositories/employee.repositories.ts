import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EmployeeProfile, EmployeeProfileDocument } from '../schemas/employee.schema';

@Injectable()
export class EmployeeRepository {

    
  constructor(
    @InjectModel(EmployeeProfile.name)
    private readonly employeeProfileModel: Model<EmployeeProfileDocument>,
  ) {}




  async updateByUserId(userId: string, updateData: any): Promise<EmployeeProfileDocument> {
    
    const objectId = new Types.ObjectId(userId);
    const updatedProfile = await this.employeeProfileModel.findOneAndUpdate(
      { user_id: objectId } as any,
      { $set: updateData } as any,
      { new: true, runValidators: true, upsert: true, }
    ).exec();

    if (!updatedProfile) {
      throw new NotFoundException(`Employee profile for User ID ${userId} not found`);
    }

    return updatedProfile;
  }




  async create(data: any): Promise<EmployeeProfileDocument> {
  
    if (data.user_id && typeof data.user_id === 'string') {
      data.user_id = new Types.ObjectId(data.user_id);
    }
    
    const newProfile = new this.employeeProfileModel(data);
    return await newProfile.save();
  }

  async findByUserId(userId: string): Promise<EmployeeProfileDocument | null> {
    return await this.employeeProfileModel
      .findOne({ user_id: new Types.ObjectId(userId) } as any)
      .exec();
  }
}