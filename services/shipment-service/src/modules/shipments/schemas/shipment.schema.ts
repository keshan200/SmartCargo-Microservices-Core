import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PackageType, PaymentMethod, PaymentStatus, ServiceType, ShipmentStatus } from '../interfaces/shipment.enum';

export type ShipmentDocument = Shipment & Document;

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
  @Prop({ type: String, required: true, unique: true, index: true ,default: null })
  tracking_id: string;
  
  @Prop({ type: String, default: null }) // QR එකට අවශ්‍ය Data එක මෙහි තබා ගන්න
  qr_code: string;

  // Sender Details
  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  sender_id: Types.ObjectId;

   @Prop({ type: String, required: true })
  sender_name: string;

  @Prop({ type: String, required: true })
  sender_email: string;

  @Prop({ type: String, required: true })
  sender_phone: string;

  @Prop({ type: String, required: true })
  sender_address: string;

  @Prop({ type: String, required: true })
  sender_city: string;

  @Prop({ type: String, required: true })
  sender_postal_code: string;




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
    enum: Object.values(PackageType), 
    required: true 
  })
  package_type: PackageType;

  @Prop({ type: Number, required: true })
  weight_kg: number;

  @Prop({ type: PackageDimensions, required: false })
  dimensions: PackageDimensions;





  // Cost & Payment
  @Prop({ 
    type: String, 
    enum: Object.values(ServiceType), 
    required: true 
  })
  service_type: ServiceType;

  @Prop({ type: Number, default: 0 })
  total_cost: number;

  @Prop({ 
    type: String, 
    enum: Object.values(PaymentStatus), 
    default: PaymentStatus.PENDING 
  })
  payment_status: PaymentStatus;

  @Prop({ 
    type: String, 
    enum: Object.values(PaymentMethod), 
    required: true 
  })
  payment_method: PaymentMethod;




  // Logistics & Status
  @Prop({
    type: String,
    enum: Object.values(ShipmentStatus),
    default: ShipmentStatus.ORDERED, // මුලින්ම ඕඩර් කළ අවස්ථාව
  })
  current_status: ShipmentStatus;

  @Prop({ type: Types.ObjectId, ref: 'Hub', required: true })
  current_hub_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'EmployeeProfile', default: null })
  assigned_driver_id: Types.ObjectId;





  // Receiver Coordinates (Live Tracking වලට අත්‍යවශ්‍යයි)
  @Prop({ type: Number, required: true })
  delivery_lat: number;

  @Prop({ type: Number, required: true })
  delivery_lng: number;




  // Actual Times (Analytics වලට)
  @Prop({ type: Date, default: null })
  picked_up_at: Date;

  @Prop({ type: Date, default: null })
  delivered_at: Date;
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment);