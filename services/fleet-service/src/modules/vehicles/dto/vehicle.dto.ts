import { IsString, IsEnum, IsNumber, IsOptional, IsMongoId } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  vehicle_number: string;

  @IsEnum(['BIKE', 'VAN', 'TRUCK'])
  vehicle_type: string;

  @IsNumber()
  capacity_kg: number;

  @IsOptional()
  @IsMongoId()
  current_driver_id?: string;

  @IsOptional()
  @IsMongoId()
  assigned_hub_id?: string;
}