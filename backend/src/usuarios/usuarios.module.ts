import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    // Usamos registerAsync para asegurar que las variables de entorno se carguen primero
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_KEY') || 'supersecretjwtkey',
        signOptions: {
          expiresIn: config.get<string>('EXPIRES_IN') || '7d',
        },
      }),
      global: true,
    }),
    TypeOrmModule.forFeature([Usuario]),
  ],
  controllers: [UsuariosController],
  providers: [
    UsuariosService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [UsuariosService], // Exportamos para que Tickets pueda validar usuarios si es necesario
})
export class UsuariosModule {}