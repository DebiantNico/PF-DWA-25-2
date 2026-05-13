import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CiudadesService {
  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) {}

  create(createCiudadDto: CreateCiudadDto) {
    const nuevaCiudad = this.ciudadRepository.create(createCiudadDto);
    return this.ciudadRepository.save(nuevaCiudad);
  }

  findAll() {
    return this.ciudadRepository.find();
  }

  async findOne(id: string) {
    const ciudad = await this.ciudadRepository.findOneBy({ id });
    return this.notFound(id, ciudad);
  }

  async update(id: string, updateCiudadDto: UpdateCiudadDto) {
    const ciudad = await this.ciudadRepository.preload({
      id,
      ...updateCiudadDto,
    });
    const ciudadValidada = this.notFound(id, ciudad);
    return this.ciudadRepository.save(ciudadValidada);
  }

  async remove(id: string) {
    const del = await this.ciudadRepository.delete({ id });
    if (!del.affected) {
      this.notFound(id, null);
    }

    return {
      message: `Elemento con ID ${id} eliminado correctamente`,
    };
  }

  private notFound(id: string, ciudad: Ciudad | undefined | null): Ciudad {
    if (!ciudad) {
      throw new NotFoundException(`Elemento con ID ${id} no encontrado`);
    }
    return ciudad;
  }
}