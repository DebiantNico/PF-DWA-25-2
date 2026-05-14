import { InjectRepository } from "@nestjs/typeorm";
import { Ruta } from "./entities/ruta.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { CreateRutaDto } from "./dto/create-ruta.dto";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { UpdateRutaDto } from "./dto/update-ruta.dto";

@Injectable()
export class RutasService {
    constructor(
        @InjectRepository(Ruta)
        private readonly rutaRepository: Repository<Ruta>,
    ) {}

    async create(createRutaDto: CreateRutaDto) {
        const rutaInversa = this.rutaRepository.create({
            desde: createRutaDto.hacia,
            hacia: createRutaDto.desde,
            horario: createRutaDto.horario,
        });
        await this.rutaRepository.save(rutaInversa);
        
        const nuevaRuta = this.rutaRepository.create(createRutaDto);
        return this.rutaRepository.save(nuevaRuta);
    }

    findAll() {
        return this.rutaRepository.find();
    }

    async findOne(id: number) {
        const ruta = await this.rutaRepository.findOneBy({ id });
        return this.notFound(id, ruta);
    }

    async update(id: number, updateRutaDto: UpdateRutaDto) {
        const ruta = await this.rutaRepository.preload({
            id,
            ...updateRutaDto,
        });
        return this.rutaRepository.save(this.notFound(id, ruta));
    }
    async remove(id: number) {
        const del = await this.rutaRepository.delete({ id });
        if (!del.affected) {
            this.notFound(id, null);
        }

        return {
            message: `Elemento con ID ${id} eliminado`,
        };
    }

    private notFound(id: number, ruta: Ruta | null | undefined): Ruta {
        if (!ruta) {
            throw new NotFoundException(`Elemento con ID ${id} no encontrado`);
        }
        return ruta;
    }
}

