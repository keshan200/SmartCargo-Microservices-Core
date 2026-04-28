import { IsEnum, IsMongoId, IsOptional, IsString, IsPhoneNumber, MinLength } from 'class-validator';
import { StaffStatus } from '../interfaces/employee.interface';

export class employeeDto {

  @IsString()
  @MinLength(3, { message: 'Full name must be at least 3 characters long' })
  @IsOptional()
  full_name?: string;

  @IsPhoneNumber(undefined, { message: 'Invalid mobile number format' })
  @IsOptional()
  mobile_number?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsMongoId({ message: 'Invalid Hub ID format' })
  @IsOptional()
  assigned_hub_id?: string;


  @IsString()
  @IsOptional()
  license_number?: string;

  @IsEnum(StaffStatus, {
    message: 'Status must be ACTIVE, ON_LEAVE, or ON_TRIP',
  })
  @IsOptional()
  status?: StaffStatus;
}