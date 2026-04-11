// src/fleet/dto/update-employee-profile.dto.ts
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { StaffStatus } from '../interfaces/employee.interface';

export class employeeDto {
  

  @IsEnum(['DRIVER', 'DISPATCHER'], {
    message: 'employee_type must be either DRIVER or DISPATCHER',
  })
  @IsOptional()
  employee_type?: string;

  // Hub එක assign කරද්දී මේක පාවිච්චි වෙනවා
  @IsMongoId({ message: 'Invalid Hub ID format' })
  @IsOptional()
  assigned_hub_id?: string;

  // Driver කෙනෙක් තමන්ගේ ලයිසන් එක දාද්දී
  @IsString()
  @IsOptional()
  license_number?: string;

  // සේවකයාගේ තත්ත්වය මාරු කරද්දී (උදා: ON_TRIP)
  @IsEnum(StaffStatus, {
    message: 'Status must be ACTIVE, ON_LEAVE, or ON_TRIP',
  })
  @IsOptional()
  status?: StaffStatus;
}