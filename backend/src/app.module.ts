import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RutasModule } from './rutas/rutas.module';
import { CiudadesModule } from './ciudades/ciudades.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'admin_taller',
      password: 'password123',
      database: 'bd_tickets_final',
      autoLoadEntities: true,
      synchronize: true,
    }),
    RutasModule,
    CiudadesModule,
    TicketsModule,
    UsuariosModule,
  ],
})
export class AppModule {}