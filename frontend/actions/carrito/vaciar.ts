'use server';

import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';
import { revalidateTag } from 'next/cache';

export default async function vaciarCarrito() {
  try {
    const response = await fetch(`${API_URL}/tickets/carrito`, {
      method: 'DELETE',
      headers: authHeaders(),
      cache: 'no-store',
    });

    if (response.status === 200) {
      revalidateTag('carrito');
    }
  } catch (e) {
    console.error('Vaciar Carrito Error:', e);
  }
}