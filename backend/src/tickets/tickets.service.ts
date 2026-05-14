import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository, DataSource } from 'typeorm';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class TicketsService {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketRepository: Repository<Ticket>,
        @Inject(REQUEST)
        private readonly request: any,
        private readonly dataSource: DataSource, // Inyectado para control estricto de transacciones
    ) {}

    async create(createTicketDto: CreateTicketDto) {
        const hoy = new Date().toISOString().slice(0, 10);
        if (createTicketDto.fecha < hoy) {
        throw new BadRequestException('No se pueden reservar boletos para fechas anteriores al día de hoy');
        }

        const userId = this.request.user;
        const datosTicket = {
        ...createTicketDto,
        usuario: createTicketDto.usuario || userId,
        comprado: false,
        };

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
        const ticketExistente = await queryRunner.manager.findOne(Ticket, {
            where: {
            ruta: { id: createTicketDto.ruta } as any,
            fecha: createTicketDto.fecha,
            hora: createTicketDto.hora,
            asiento: createTicketDto.asiento,
            },
        });

        if (ticketExistente) {
            throw new ConflictException('Asiento no disponible. Acaba de ser tomado por otro usuario.');
        }

        const nuevoTicket = queryRunner.manager.create(Ticket, datosTicket);
        const resultado = await queryRunner.manager.save(nuevoTicket);

        await queryRunner.commitTransaction();
        return resultado;
        } catch (error: any) {
        await queryRunner.rollbackTransaction();
        if (error.code === '23505' || error instanceof ConflictException) {
            throw new ConflictException('Lo sentimos, otro usuario acaba de seleccionar este mismo boleto al mismo tiempo.');
        }
        throw error;
        } finally {
        await queryRunner.release();
        }
    }

    async findOne(id: string) {
        const ticket = await this.ticketRepository.findOne({
        where: { id },
        relations: { usuario: true },
        });
        return this.notFound(id, ticket);
    }

    async carrito() {
        const userId = this.request.user;
        const carrito = await this.ticketRepository.find({
        where: {
            usuario: { id: userId } as any,
            comprado: false,
        },
        });

        if (!carrito.length) {
        throw new NotFoundException('Tu carrito de compras está vacío');
        }
        return carrito;
    }

    async comprar() {
        const carrito = await this.carrito();
        const boletosComprados = carrito.map((ticket) => {
        ticket.comprado = true;
        return ticket;
        });

        return this.ticketRepository.save(boletosComprados);
    }

    async update(id: string, updateTicketDto: UpdateTicketDto) {
        const ticket = await this.ticketRepository.preload({
        id,
        ...updateTicketDto,
        });
        const ticketValidado = this.notFound(id, ticket);
        return this.ticketRepository.save(ticketValidado);
    }

    async remove(id: string) {
        const del = await this.ticketRepository.delete({ id });
        if (!del.affected) {
        this.notFound(id, null);
        }

        return {
        message: `Boleto con ID ${id} retirado del carrito`,
        };
    }

    async vaciarCarrito() {
        const userId = this.request.user;
        const del = await this.ticketRepository.delete({
        usuario: { id: userId } as any,
        comprado: false,
        });

        if (!del.affected) {
        throw new NotFoundException({
            message: 'El carrito ya está vacío',
            affected: 0,
        });
        }

        return {
        message: `Carrito vaciado con exito. Se retiraron ${del.affected} elementos.`,
        affected: del.affected,
        };
    }

    private notFound(id: string, ticket: Ticket | null | undefined): Ticket {
        if (!ticket) {
        throw new NotFoundException(`Boleto con ID ${id} no encontrado`);
        }
        return ticket;
    }
}