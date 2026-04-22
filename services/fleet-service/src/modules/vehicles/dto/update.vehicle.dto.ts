
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { CreateVehicleDto } from './vehicle.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
    
  @IsOptional()
  @IsEnum(['AVAILABLE', 'ON_TRIP', 'MAINTENANCE', 'OUT_OF_SERVICE'])
  status?: string;

  @IsOptional()
  @IsString()
  current_driver_id?: string; 
}