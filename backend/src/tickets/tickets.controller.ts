import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { DisabledGuard } from '../usuarios/guards/disabled.guard';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @Get('carrito')
    carrito() {
        return this.ticketsService.carrito();
    }

    @Post('comprar')
    comprar() {
        return this.ticketsService.comprar();
    }

    @Delete('carrito')
    vaciarcarrito() {
        return this.ticketsService.vaciarCarrito();
    }

    @Post()
    create(@Body() createTicketDto: CreateTicketDto) {
        return this.ticketsService.create(createTicketDto);
    }

    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.ticketsService.findOne(id);
    }

    @UseGuards(DisabledGuard)
    @Patch(':id')
    update(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body() updateTicketDto: UpdateTicketDto,
    ) {
        return this.ticketsService.update(id, updateTicketDto);
    }

    @Delete(':id')
    remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.ticketsService.remove(id);
    }
}