import { cache } from 'react';
import { cookies } from 'next/headers';
import { TOKEN_NAME } from '@/constants';

export const authHeaders = cache(() => {
    const cookieStore = cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;

    return {
        Authorization: `Bearer ${token || ''}`,
        'Content-Type': 'application/json',
    };
});