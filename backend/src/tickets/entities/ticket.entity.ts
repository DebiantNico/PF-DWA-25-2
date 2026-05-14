import { Ruta } from '../../rutas/entities/ruta.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { MAX_ASIENTOS } from '../constants/asientos.constants';

@Entity('tickets')
@Check(`"asiento" BETWEEN 1 AND ${MAX_ASIENTOS}`)
// GARANTÍA DE CONCURRENCIA: Evita duplicados a nivel de motor de base de datos
@Unique(['ruta', 'fecha', 'hora', 'asiento'])
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Ruta, (ruta) => ruta.tickets, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'ruta' })
  ruta!: Ruta | number;

  @Column({ type: 'date' })
  fecha!: string;

  @Column({ type: 'time' })
  hora!: string;

  @Column({ type: 'int' })
  asiento!: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.tickets, {
    nullable: false,
  })
  @JoinColumn({ name: 'usuario' })
  usuario!: Usuario | string;

  @Column({ type: 'boolean', default: false })
  comprado!: boolean;
}