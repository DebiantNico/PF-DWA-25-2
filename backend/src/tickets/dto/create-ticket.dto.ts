import { IsDateString, IsMilitaryTime, IsNumber, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { MAX_ASIENTOS } from '../constants/asientos.constants';

export class CreateTicketDto {
    @IsNumber()
    @Min(0)
    ruta!: number;

    @IsDateString()
    fecha!: string;

    @IsString()
    @IsMilitaryTime()
    hora!: string;

    @IsNumber()
    @Min(1)
    @Max(MAX_ASIENTOS)
    asiento!: number;

    @IsOptional()
    @IsUUID('4')
    usuario?: string;
}