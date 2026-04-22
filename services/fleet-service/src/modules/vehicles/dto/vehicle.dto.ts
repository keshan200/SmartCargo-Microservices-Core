import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export enum VehicleType {
  BIKE = 'BIKE',
  VAN = 'VAN',
  TRUCK = 'TRUCK',
}

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  vehicle_number: string;

  @IsEnum(VehicleType)
  @IsNotEmpty()
  vehicle_type: string;

  @IsNumber()
  @IsNotEmpty()
  capacity_kg: number;

  @IsOptional()
  @IsNumber()
  current_lat?: number;

  @IsOptional()
  @IsNumber()
  current_lng?: number;

  @IsOptional()
  @IsString()
  assigned_hub_id?: string;
}