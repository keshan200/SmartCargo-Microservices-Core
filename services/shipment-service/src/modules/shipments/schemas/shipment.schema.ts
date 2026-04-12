import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ShipmentDocument = Shipment & Document;

// Dimensions සඳහා කුඩා Schema එකක් (Nested)
@Schema({ _id: false })
class PackageDimensions {
  @Prop({ type: Number, required: true })
  length: number;

  @Prop({ type: Number, required: true })
  width: number;

  @Prop({ type: Number, required: true })
  height: number;
}



@Schema({ timestamps: true })
export class Shipment {


  @Prop({ type: Types.ObjectId, required: true })
  sender_id: Types.ObjectId;

  // Receiver Details
  @Prop({ type: String, required: true })
  receiver_name: string;

  @Prop({ type: String, required: true })
  receiver_email: string;

  @Prop({ type: String, required: true })
  receiver_phone: string;

  @Prop({ type: String, required: true })
  receiver_address: string;

  @Prop({ type: String, required: true })
  receiver_city: string;

  @Prop({ type: String, required: true })
  receiver_postal_code: string;

  // Package Details
  @Prop({ 
    type: String, 
    enum: ['DOCUMENT', 'PARCEL', 'FRAGILE', 'LIQUID'], 
    required: true 
  })
  package_type: string;

  @Prop({ type: Number, required: true })
  weight_kg: number;

  @Prop({ type: PackageDimensions, required: false })
  dimensions: PackageDimensions;

  // Cost & Payment
  @Prop({ type: String, enum: ['STANDARD', 'EXPRESS'], required: true })
  service_type: string;

  @Prop({ type: Number, required: true })
  total_cost: number;

  @Prop({ 
    type: String, 
    enum: ['PENDING', 'PAID'], 
    default: 'PENDING' 
  })
  payment_status: string;

  @Prop({ 
    type: String, 
    enum: ['CASH_ON_DELIVERY', 'PREPAID'], 
    required: true 
  })
  payment_method: string;

  // Logistics & Status
  @Prop({
    type: String,
    enum: ['PICKED_UP', 'IN_TRANSIT', 'SORTING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'],
    default: 'PICKED_UP',
  })
  current_status: string;

  @Prop({ type: Types.ObjectId, ref: 'Hub', required: true })
  current_hub_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'EmployeeProfile', default: null })
  assigned_driver_id: Types.ObjectId;
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment);