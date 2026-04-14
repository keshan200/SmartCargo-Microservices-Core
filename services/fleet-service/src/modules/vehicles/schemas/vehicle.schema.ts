import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VehicleDocument = Vehicle & Document;

@Schema({ timestamps: true })
export class Vehicle {

  @Prop({ type: String, required: true, unique: true })
  vehicle_number: string;

  @Prop({ type: String, enum: ['BIKE', 'VAN', 'TRUCK'], required: true })
  vehicle_type: string;

  @Prop({ type: Number, required: true })
  capacity_kg: number;

  @Prop({ type: Number, default: 0 })
  current_lat: number;

  @Prop({ type: Number, default: 0 })
  current_lng: number;

  @Prop({ type: Date, default: Date.now })
  last_updated: Date;

  @Prop({ type: Types.ObjectId, ref: 'EmployeeProfile', default: null })
  current_driver_id: Types.ObjectId;
  
  @Prop({ type: Types.ObjectId, ref: 'Hub', default: null })
  assigned_hub_id: Types.ObjectId;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);