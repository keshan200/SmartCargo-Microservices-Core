import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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


}