import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { Role } from '../auth/decorators/role.decorator';
import { Requestuser } from 'src/auth/decorators/user.decorator';
import { User } from 'src/auth/dto/User.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Role(['staff', 'admin'])
  @Get('all')
  async getAllReservations(
    @Query('pageNumber') pageNumber: number = 1,
    @Requestuser() user: User,
    @Query('startDate') startDate: string | null = null,
    @Query('endDate') endDate: string | null = null,
  ) {
    return this.reservationsService.findReservationsByPage(pageNumber, user.role, startDate, endDate);
  }


  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Role(['admin'])
  @Get('analysis')
  async getReservationAnalysis() {
    return this.reservationsService.getReservationAnalysis();
  }
}
