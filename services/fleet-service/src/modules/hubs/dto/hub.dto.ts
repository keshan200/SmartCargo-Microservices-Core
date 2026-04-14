import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateHubDto {
  @IsString() @IsNotEmpty()
  hub_name: string;

  @IsString() @IsNotEmpty()
  city: string;

  @IsString() @IsNotEmpty()
  address: string;

  @IsString() @IsNotEmpty()
  contact_no: string;

  @IsNotEmpty()@IsNumber()
  latitude: number;
  @IsNotEmpty()@IsNumber()
  longitude: number;
}