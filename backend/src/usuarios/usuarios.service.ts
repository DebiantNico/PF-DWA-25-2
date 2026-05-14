import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';

@Injectable( )
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        private readonly jwtService: JwtService,
    ) {}

    async signup(createUsuarioDto: CreateUsuarioDto) {
        const { email, password } = createUsuarioDto;
        const usuarioRepetido = await this.usuarioRepository.findOneBy({ email });
        if (usuarioRepetido) {
        throw new BadRequestException('El usuario ya existe en el sistema');
        }

        const hashedPassword = await hash(password, 5);
        const nuevoUsuario = this.usuarioRepository.create({
        ...createUsuarioDto,
        password: hashedPassword,
    });
    
    await this.usuarioRepository.save(nuevoUsuario);
    const { password: _, ...result } = nuevoUsuario;
    return result;
    }

    async login(createUsuarioDto: CreateUsuarioDto, response: Response) {
        const { email, password } = createUsuarioDto;
        const usuario = await this.usuarioRepository.findOneBy({ email });

        const match = await compare(password, this.notFound(usuario).password);

        if (!match) {
        throw new UnauthorizedException('Contraseña incorrecta');
        }

        const token = this.jwtService.sign({
        email,
        user: usuario?.id,
    });
    return this.tokenCookies(token, response);
    }

    async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
        const { password } = updateUsuarioDto;
        let hashedPassword = password;
        if (password) {
        hashedPassword = await hash(password, 5);
        }

    const usuario = await this.usuarioRepository.preload({
        id,
        ...updateUsuarioDto,
        ...(password && { password: hashedPassword }),
        });

        return this.usuarioRepository.save(this.notFound(usuario));
    }

    async remove(id: string) {
        const del = await this.usuarioRepository.delete({ id });
        if (!del.affected) {
        this.notFound(null);
        }
        return {
        message: `Usuario con ID ${id} eliminado correctamente`,
        };
    }

    async verifyIdentity(id: string, filename: string) {
        const usuario = await this.usuarioRepository.findOneBy({ id });
        const user = this.notFound(usuario);
        
        user.identityDocument = filename;
        await this.usuarioRepository.save(user);

        return {
        success: true,
        message: 'Documento de identidad cargado exitosamente para su verificación',
        document: filename,
        };
    }

    private notFound(usuario: Usuario | null | undefined): Usuario {
        if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
        }
        return usuario;
    }

    private tokenCookies(token: string, response: Response): string {
        const tokenName = process.env.TOKEN_NAME || 'auth_autobus_token';
        response.cookie(tokenName, token, {
        httpOnly: false, 
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        return token;
    }
}