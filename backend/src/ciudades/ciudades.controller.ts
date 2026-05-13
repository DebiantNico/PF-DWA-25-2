import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { CiudadesService } from './ciudades.service';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';
import { DisabledGuard } from '../usuarios/guards/disabled.guard';

@Controller('ciudades')
export class CiudadesController {
  constructor(private readonly ciudadesService: CiudadesService) {}

  /**
   * Ruta desactivada por regla de negocio
   */
  @UseGuards(DisabledGuard)
  @Post()
  create(@Body() createCiudadDto: CreateCiudadDto) {
    return this.ciudadesService.create(createCiudadDto);
  }

  @Get()
  findAll() {
    return this.ciudadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.ciudadesService.findOne(id);
  }

  /**
   * Ruta desactivada por regla de negocio
   */
  @UseGuards(DisabledGuard)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateCiudadDto: UpdateCiudadDto,
  ) {
    return this.ciudadesService.update(id, updateCiudadDto);
  }

  /**
   * Ruta desactivada por regla de negocio
   */
  @UseGuards(DisabledGuard)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.ciudadesService.remove(id);
  }
}