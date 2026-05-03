import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmployeeService } from '../services/employee.service';

@Controller()
export class EmployeeMesssageController {
  constructor(private readonly employeeService: EmployeeService) {}

  @MessagePattern({ cmd: 'get_hub_location' })
  async getHubLocation(@Payload() data: { userId: string }) {
    
    const employee = await this.employeeService.findByUserId(data.userId);
    
    if (!employee || !employee.hub) {
      return null;
    }

    return {
      lat: employee.hub.lat,
      lng: employee.hub.lng,
      name: employee.hub.name
    };
  }
}