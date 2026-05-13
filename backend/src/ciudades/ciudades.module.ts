import { Module } from '@nestjs/common';
import { CiudadesService } from './ciudades.service';
import { CiudadesController } from './ciudades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../usuarios/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudad])],
  controllers: [CiudadesController],
  providers: [
    CiudadesService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class CiudadesModule {}