import {
    Controller,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
    Res,
    UseInterceptors,
    UploadedFile,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import type { Response } from 'express';
import { Public } from './decorators/public.decorators';

@Controller()
export class UsuariosController{
    constructor(private readonly usuariosService: UsuariosService) {}

    @Public()
    @Post('signup')
    signup(@Body() createUsuarioDto: CreateUsuarioDto) {
        return this.usuariosService.signup(createUsuarioDto);
    }

    @Public()
    @Post('login')
    login(
        @Body() createUsuarioDto: CreateUsuarioDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        return this.usuariosService.login(createUsuarioDto, response);
    }

    @Patch('usuarios/:id')
    update(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body() updateUsuarioDto: UpdateUsuarioDto,
    ) {
        return this.usuariosService.update(id, updateUsuarioDto);
    }

    @Delete('usuarios/:id')
    remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.usuariosService.remove(id);
    }
    
    @Post('usuarios/:id/verify')
    @UseInterceptors(
        FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/identities',
            filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
            },
        }),
        }),
    )
    uploadIdentity(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @UploadedFile(
        new ParseFilePipe({
            validators: [
            new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
            new FileTypeValidator({ fileType: '.(png|jpeg|jpg|pdf)' }),
            ],
        }),
        )
        file: Express.Multer.File,
    ) {
        return this.usuariosService.verifyIdentity(id, file.filename);
    }
}