import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmployeeService } from '../services/employee.service';

@Controller()
export class EmployeeMesssageController {
  constructor(private readonly employeeService: EmployeeService) {}

  @MessagePattern({ cmd: 'get_hub_location' })
  async getHubLocation(@Payload() data: { userId: string }) {
    
    const employee = await this.employeeService.findByUserId(data.userId);
    
console.log('Employee Hub Data:', employee.hub_name, employee.latitude, employee.longitude);


    if (!employee || !employee.hub) {
      return null;
    }

    return {
      lat: employee.hub.lat,
      lng: employee.hub.lng,
      name: employee.hub.name,
    };
  }
}