import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { StaffStatus } from '../interfaces/employee.interface';


export type EmployeeProfileDocument = EmployeeProfile & Document;

@Schema({ timestamps: true }) 
export class EmployeeProfile  {
  
  
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, unique: true })
  user_id: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, enum: ['DRIVER', 'DISPATCHER'], required: true })
  employee_type: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Hub', default: null })
  assigned_hub_id: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, default: null })
  license_number: string;
  
  @Prop({ type: String, enum: Object.values(StaffStatus), required: true })
  status : StaffStatus



}

export const EmployeeProfileSchema = SchemaFactory.createForClass(EmployeeProfile);