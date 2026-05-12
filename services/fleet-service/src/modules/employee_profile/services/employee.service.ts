import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { model, Model, Types } from 'mongoose';
import { EmployeeProfile, EmployeeProfileDocument } from '../schemas/employee.schema';
import { EmployeeRepository } from '../repositories/employee.repositories';


@Injectable()
export class EmployeeService {

  
  constructor(
    @InjectModel(EmployeeProfile.name) 
    private employeeProfileModel: Model<EmployeeProfile>,
    private readonly employeeRepository: EmployeeRepository
  ) {}




  async createInitialProfile(data: any) {
    const newProfile = new this.employeeProfileModel({
      user_id: data.userId, 
      employee_type: data.role,
      status: 'ACTIVE',
    });
    
    console.log('Saving profile for user:', data.userId);
    return await newProfile.save();
  }
 



  async updateProfile(user_id: string, updateData: any): Promise<EmployeeProfileDocument> {
    try {
      return await this.employeeRepository.updateByUserId(user_id, updateData);
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update employee profile');
    }
  }



  async findByUserId(userId: string): Promise<any> {
  const employee = await this.employeeProfileModel
    .findOne({ user_id: new Types.ObjectId(userId) } as any) 
    .populate({
        path: 'assigned_hub_id', 
        model: 'Hub' 
    })
    .exec();

  if (!employee || !employee.assigned_hub_id) {
    return {
      hub: null,
    };
  }

  const hub = employee.assigned_hub_id as any;

  return {
    hub: {
      lat: hub.latitude, 
      lng: hub.longitude,
      name: hub.hub_name,
    }
  };
}
}