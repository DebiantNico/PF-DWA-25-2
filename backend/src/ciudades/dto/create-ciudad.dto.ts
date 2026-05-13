import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateCiudadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  estado: string;
}