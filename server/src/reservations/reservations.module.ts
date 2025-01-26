import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';

@Module({
  providers: [ReservationsService],
  exports: [ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
