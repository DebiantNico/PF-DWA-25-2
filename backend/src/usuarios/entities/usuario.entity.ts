import { Ticket } from '../../tickets/entities/ticket.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column({ type: 'text' })
  password: string;

  // BONUS: Columna para registrar si subió documento de identidad
  @Column({ type: 'text', nullable: true })
  identityDocument: string;

  @OneToMany(() => Ticket, (ticket) => ticket.usuario)
  tickets: Ticket[];
}