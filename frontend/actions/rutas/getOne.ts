'use server';

import { API_URL } from '@/constants';
import { Ruta } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';

export default async function getRuta(id: number): Promise<Ruta | null> {
    try {
        const response = await fetch(`${API_URL}/rutas/${id}`, {
        method: 'GET',
        headers: authHeaders(),
        next: {
            tags: ['rutas', `rutas:${id}`],
        },
        });

        if (response.status === 200) {
        return await response.json();
        }
        return null;
    } catch (e) {
        console.error(`Get Ruta ${id} Error:`, e);
        return null;
    }
}