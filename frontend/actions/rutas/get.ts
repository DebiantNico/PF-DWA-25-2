'use server';

import { API_URL } from '@/constants';
import { Ruta } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';

export default async function getRutas(): Promise<Ruta[]> {
    try {
        const response = await fetch(`${API_URL}/rutas`, {
        method: 'GET',
        headers: authHeaders(),
        next: {
            tags: ['rutas'],
        },
        });

        if (response.status === 200) {
        return await response.json();
        }
        return [];
    } catch (e) {
        console.error('Get Rutas Error:', e);
        return [];
    }
}