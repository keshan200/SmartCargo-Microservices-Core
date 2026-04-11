import { Controller, Post, Get, Patch, Body, Param, HttpStatus, Res } from '@nestjs/common';
import { CreateVehicleDto } from '../dto/vehicle.dto';
import { VehicleService } from '../service/vehicle.service';


@Controller('api/v1/vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}


  @Post("/create")
  async create(@Body() createVehicleDto: CreateVehicleDto, @Res() res) {
    const vehicle = await this.vehicleService.createVehicle(createVehicleDto);
    return res.status(HttpStatus.CREATED).json({
      status: 'success',
      data: vehicle
    });
  }



  @Get("/all")
  async findAll(@Res() res) {
    const vehicles = await this.vehicleService.getAllVehicles();
    return res.status(HttpStatus.OK).json({
      status: 'success',
      results: vehicles.length,
      data: vehicles
    });
  }

  

  @Patch('/assign-driver/:id')
  async assignDriver(
    @Param('id') id: string,
    @Body('driver_profile_id') driverProfileId: string,
    @Res() res
  ) {
    const updated = await this.vehicleService.assignDriver(id, driverProfileId);
    return res.status(HttpStatus.OK).json({
      status: 'success',
      data: updated
    });
  }
}