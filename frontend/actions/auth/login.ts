'use server';

import { API_URL, TOKEN_NAME } from '@/constants';
import { cookies } from 'next/headers';

export default async function login(authData: {
  email?: string;
  password?: string;
}) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
      cache: 'no-store', 
    });

    if (response.status === 200 || response.status === 201) {
      const token = await response.text();
      cookies().set(TOKEN_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return response.status;
  } catch (e) {
    console.error('Login Action Error:', e);
    return 500;
  }
}