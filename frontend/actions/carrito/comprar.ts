'use server';

import { API_URL } from '@/constants';
import { authHeaders } from '@/helpers/authHeaders';
import { revalidateTag } from 'next/cache';

export default async function comprar(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/tickets/comprar`, {
      method: 'POST',
      headers: authHeaders(),
      cache: 'no-store',
    });

    if (response.status === 200 || response.status === 201) {
      revalidateTag('carrito');
      return true;
    }
    return false;
  } catch (e) {
    console.error('Comprar Action Error:', e);
    return false;
  }
}