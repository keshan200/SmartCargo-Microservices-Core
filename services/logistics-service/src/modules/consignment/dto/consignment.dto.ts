// src/modules/consignment/dto/create-consignment.dto.ts
import { IsString, IsArray, IsNumber, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateConsignmentDto {
  @IsString() @IsNotEmpty() 
  consignment_id: string;

  @IsString() @IsNotEmpty() 
  vehicle_id: string;

  @IsNumber()
   total_weight_kg: number;

  @IsString() 
  origin_hub_id: string;

  @IsString()
   destination_hub_id: string;

  @IsArray() @IsString({ each: true }) 
  shipment_ids: string[];

  @IsDateString()
   departure_time: string;

  @IsDateString() 
  estimated_arrival: string;
}