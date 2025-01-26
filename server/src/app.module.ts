import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ReservationsModule } from './reservations/reservations.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [AuthModule, UsersModule, ReservationsModule, SeedModule],
})
export class AppModule {}
