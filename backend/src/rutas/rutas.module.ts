import { Module } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { RutasController } from './rutas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ruta } from './entities/ruta.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../usuarios/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Ruta])],
  controllers: [RutasController],
  providers: [
    RutasService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [TypeOrmModule],
})
export class RutasModule {}