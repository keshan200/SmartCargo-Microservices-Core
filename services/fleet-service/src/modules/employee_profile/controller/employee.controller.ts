import { Body, Controller, HttpStatus, Param, Patch, Res } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EmployeeService } from '../services/employee.service';


@Controller("api/v1/employees")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @EventPattern('user_created') // User service එකෙන් emit කරන නමම වෙන්න ඕනේ
  async handleUserCreated(@Payload() data: any) {
    console.log('Got it! User ID is:', data.userId);
  
    // DB එකේ හිස් Profile එකක් හදන්න service එකට දෙනවා
    return await this.employeeService.createInitialProfile(data);
  }




  @Patch('profile/:userId')
  async updateEmployeeProfile(
    @Param('userId') userId: string,
    @Body() updateData: any,
    @Res() res
  ) {
    const updatedProfile = await this.employeeService.updateProfile(userId, updateData);
    
    return res.status(HttpStatus.OK).json({
      message: 'Employee profile updated successfully',
      data: updatedProfile,
    });
  }
}