import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { RutasService } from './rutas.service';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { DisabledGuard } from '../usuarios/guards/disabled.guard';

@Controller('rutas')
export class RutasController {
  constructor(private readonly rutasService: RutasService) {}

  @UseGuards(DisabledGuard)
  @Post()
  create(@Body() createRutaDto: CreateRutaDto) {
    return this.rutasService.create(createRutaDto);
  }

  @Get()
  findAll() {
    return this.rutasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rutasService.findOne(id);
  }

  @UseGuards(DisabledGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRutaDto: UpdateRutaDto,
  ) {
    return this.rutasService.update(id, updateRutaDto);
  }

  @UseGuards(DisabledGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rutasService.remove(id);
  }
}