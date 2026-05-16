'use server';

import { API_URL } from '@/constants';
import { Ciudad } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';

export default async function getCiudades(): Promise<Ciudad[]> {
  try {
    const response = await fetch(`${API_URL}/ciudades`, {
      method: 'GET',
      headers: authHeaders(),
      next: {
        tags: ['ciudades'],
      },
    });

    if (response.status === 200) {
      return await response.json();
    }
    return [];
  } catch (e) {
    console.error('Get Ciudades Error:', e);
    return [];
  }
}