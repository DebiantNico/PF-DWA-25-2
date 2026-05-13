import { IsMilitaryTime, IsString, IsUUID, IsArray } from 'class-validator';

export class CreateRutaDto {
  @IsUUID('4')
  desde: string;

  @IsUUID('4')
  hacia: string;

  @IsArray()
  @IsString({ each: true })
  @IsMilitaryTime({ each: true })
  horario: string[];
}