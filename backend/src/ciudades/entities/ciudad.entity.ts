import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ruta } from '../../rutas/entities/ruta.entity';

@Entity('ciudades')
export class Ciudad {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  nombre!: string;

  @Column({ type: 'text' })
  estado!: string;

  @OneToMany(() => Ruta, (ruta) => ruta.desde)
  rutasDesde!: Ruta[];

  @OneToMany(() => Ruta, (ruta) => ruta.hacia)
  rutasHacia!: Ruta[];
}