'use server';

import { API_URL } from '@/constants';
import { Ticket } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';

export default async function getCarrito(): Promise<Ticket[]> {
  try {
    const response = await fetch(`${API_URL}/tickets/carrito`, {
      method: 'GET',
      headers: authHeaders(),
      next: {
        tags: ['carrito'],
      },
    });

    if (response.status === 200) {
      return await response.json();
    }
    return [];
  } catch (e) {
    console.error('Get Carrito Error:', e);
    return [];
  }
}