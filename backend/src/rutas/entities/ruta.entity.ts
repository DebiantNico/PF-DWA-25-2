import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Ciudad } from '../../ciudades/entities/ciudad.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity('rutas')
@Unique(['desde', 'hacia'])
export class Ruta {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => Ciudad, (ciudad) => ciudad.rutasDesde, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'desde' })
  desde!: Ciudad | string;

  @ManyToOne(() => Ciudad, (ciudad) => ciudad.rutasHacia, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'hacia' })
  hacia!: Ciudad | string;

  @Column({
    type: 'time',
    array: true,
    default: [],
  })
  horario!: string[];

  @OneToMany(() => Ticket, (ticket) => ticket.ruta)
  tickets!: Ticket[];
}