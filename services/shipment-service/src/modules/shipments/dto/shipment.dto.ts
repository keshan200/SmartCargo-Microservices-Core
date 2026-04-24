import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsEnum,
  IsOptional,
  IsMongoId,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  PackageType,
  ServiceType,
  PaymentMethod,
} from '../interfaces/shipment.enum';

class PackageDimensionsDto {
  @IsNumber()
  @IsNotEmpty()
  length: number;

  @IsNumber()
  @IsNotEmpty()
  width: number;

  @IsNumber()
  @IsNotEmpty()
  height: number;
}

export class CreateShipmentDto {
  // 1. Sender ID 
  @IsMongoId()
  @IsOptional()
  sender_id: string;

  @IsNotEmpty()
  sender_name: string;

  @IsEmail()
  @IsNotEmpty()
  sender_email: string;

  @IsString()
  @IsNotEmpty()
  sender_phone: string;

  @IsString()
  sender_address: string;

  @IsNotEmpty()
  sender_city: string;

  @IsNotEmpty()
  sender_postal_code: string;

  // 2. Receiver Details
  @IsString()
  @IsNotEmpty()
  receiver_name: string;

  @IsEmail()
  @IsNotEmpty()
  receiver_email: string;

  @IsString()
  @IsNotEmpty()
  receiver_phone: string;

  @IsString()
  @IsNotEmpty()
  receiver_address: string;

  @IsString()
  @IsNotEmpty()
  receiver_city: string;

  @IsString()
  @IsNotEmpty()
  receiver_postal_code: string;

  // 3. Package Details
  @IsEnum(PackageType)
  @IsNotEmpty()
  package_type: PackageType;

  @IsNumber()
  @IsNotEmpty()
  weight_kg: number;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PackageDimensionsDto)
  dimensions?: PackageDimensionsDto;

  // 4. Logistics & Service
  @IsEnum(ServiceType)
  @IsNotEmpty()
  service_type: ServiceType;

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  payment_method: PaymentMethod;

  @IsMongoId()
  @IsNotEmpty()
  current_hub_id: string;

  // 5. Receiver Location Coordinates (Distance කැල්කියුලේට් කරන්න මේක ඕනෙමයි)
  @IsNumber()
  @IsNotEmpty()
  delivery_lat: number;

  @IsNumber()
  @IsNotEmpty()
  delivery_lng: number;

 
}
