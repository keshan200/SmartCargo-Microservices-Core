import { IsString, IsEmail, IsNumber, IsEnum, IsNotEmpty, IsMongoId, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class DimensionsDto {
  @IsNumber() @IsNotEmpty() length: number;
  @IsNumber() @IsNotEmpty() width: number;
  @IsNumber() @IsNotEmpty() height: number;
}

export class CreateShipmentDto {
  @IsMongoId() @IsNotEmpty() sender_id: string;
  @IsString() @IsNotEmpty() receiver_name: string;
  @IsEmail() @IsNotEmpty() receiver_email: string;
  @IsString() @IsNotEmpty() receiver_phone: string;
  @IsString() @IsNotEmpty() receiver_address: string;
  @IsString() @IsNotEmpty() receiver_city: string;
  @IsString() @IsNotEmpty() receiver_postal_code: string;

  @IsEnum(['DOCUMENT', 'PARCEL', 'FRAGILE', 'LIQUID'])
  @IsNotEmpty() package_type: string;

  @IsNumber() @IsNotEmpty() weight_kg: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => DimensionsDto)
  dimensions?: DimensionsDto;

  @IsEnum(['STANDARD', 'EXPRESS'])
  @IsNotEmpty() service_type: string;

  @IsNumber() @IsNotEmpty() total_cost: number;

  @IsEnum(['CASH_ON_DELIVERY', 'PREPAID'])
  @IsNotEmpty() payment_method: string;

  @IsMongoId() @IsNotEmpty() current_hub_id: string;
}