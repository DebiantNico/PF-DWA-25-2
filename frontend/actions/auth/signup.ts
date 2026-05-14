'use server';

import { API_URL } from "@/constants";

export default async function signup(authData: {
    email?: string;
    password?: string;
}) {
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(authData),
            cache: 'no-store'
        });

        return response.status;
    } catch (e) {
        console.error('Signup Action Error:', e);
        return 500;
    }
}