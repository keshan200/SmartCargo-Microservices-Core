import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'; 
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Consignment extends Document {

  @Prop({ unique: true, required: true })
  consignment_id: string; // උදා: CON-1713158400

  @Prop({ required: true })
  vehicle_id: string;

  @Prop({ default: 0 })
  total_weight_kg: number; 

  @Prop({ type: Types.ObjectId, required: true })
  origin_hub_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  destination_hub_id: Types.ObjectId;

  @Prop({ type: [String], required: true })
  shipment_ids: string[]; // Tracking IDs array එක

  @Prop({ default: 'CREATED', enum: ['CREATED', 'DISPATCHED', 'ARRIVED', 'COMPLETED'] })
  status: string;

  @Prop({ required: true })
  departure_time: Date;

  @Prop({ required: true })
  estimated_arrival: Date;
}

export const ConsignmentSchema = SchemaFactory.createForClass(Consignment);