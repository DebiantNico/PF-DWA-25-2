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
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER || 'chihuahueno_user',
      password: process.env.DB_PASSWORD || 'supersecretpassword',
      database: process.env.DB_NAME || 'chihuahueno_tickets',
      autoLoadEntities: true,
      synchronize: true, // Cambiado a true para desarrollo inicial
    }),
    RutasModule,
    CiudadesModule,
    TicketsModule,
    UsuariosModule,
  ],
})
export class AppModule {}