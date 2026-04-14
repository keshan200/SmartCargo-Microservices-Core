import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Hub එක හදපු සහ update කරපු වෙලාවන් track කිරීමට
export class Hub extends Document {
  
  
  @Prop({ required: true, unique: true, trim: true })
  hub_name: string;
 
  @Prop({ required: true, trim: true })
  city: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  contact_no: string;

  @Prop({ required: true, type: Number })
  latitude: number;

  @Prop({ required: true, type: Number })
  longitude: number;
  
}

export const HubSchema = SchemaFactory.createForClass(Hub);