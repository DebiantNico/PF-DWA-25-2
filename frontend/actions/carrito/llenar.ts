'use server';

import { redirect } from 'next/navigation';
import createTicket from '../tickets/create';
import { Ticket } from '@/entities';
import { revalidateTag } from 'next/cache';

export default async function llenarCarrito(asientos: number[], formData: FormData) {
  const rutaId = formData.get('ruta');
  const fecha = formData.get('fecha')?.toString();
  const hora = formData.get('hora')?.toString();

  if (!rutaId || !fecha || !hora) {
    return;
  }

  const baseTicket = {
    ruta: Number(rutaId),
    fecha,
    hora,
  };

  for (const asiento of asientos) {
    await createTicket({
      ...baseTicket,
      asiento,
    } as Ticket);
  }

  revalidateTag('carrito');
  redirect('/carrito');
}