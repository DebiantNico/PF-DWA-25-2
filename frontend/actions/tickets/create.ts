'use server';

import { API_URL } from '@/constants';
import { Ticket } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';

export default async function createTicket(ticket: Ticket): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/tickets`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(ticket),
      cache: 'no-store', 
    });

    return response.status === 200 || response.status === 201;
  } catch (e) {
    console.error('Create Ticket Error:', e);
    return false;
  }
}