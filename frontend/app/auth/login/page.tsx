'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Input, Spinner } from '@nextui-org/react';
import login from '@/actions/auth/login';

export default function LoginPage() {
    const [submitting, setSubmitting] = useState(false);
    const [errorCode, setErrorCode] = useState<number | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorCode(null);

        const formData = new FormData(e.currentTarget);
        const authData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        };

        try {
        const statusCode = await login(authData);
        
        if (statusCode === 200 || statusCode === 201) {
            router.push('/');
        } else {
            setErrorCode(statusCode);
        }
        } catch (error) {
        setErrorCode(500);
        } finally {
        setSubmitting(false);
        }
    };

    return (
        <div>
        <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Bienvenido de vuelta</h1>
            <p className="text-sm text-gray-500 mt-1">Ingresa tus credenciales para continuar</p>
        </div>

        {errorCode && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg text-center font-medium">
            {errorCode === 401 || errorCode === 404 
                ? 'Correo o contraseña incorrectos. Intenta de nuevo.' 
                : 'Ocurrió un error al conectar con el servidor.'}
            </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
            <Input
            isRequired
            name="email"
            label="Correo electrónico"
            type="email"
            variant="bordered"
            color={errorCode ? 'danger' : 'default'}
            size="md"
            classNames={{ inputWrapper: 'shadow-none' }}
            />

            <Input
            isRequired
            name="password"
            label="Contraseña"
            type="password"
            variant="bordered"
            color={errorCode ? 'danger' : 'default'}
            size="md"
            classNames={{ inputWrapper: 'shadow-none' }}
            />

            <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold shadow-md hover:opacity-90 mt-2"
            size="lg"
            >
            {submitting ? <Spinner color="white" size="sm" /> : 'Iniciar Sesión'}
            </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
            ¿Aún no tienes una cuenta?{' '}
            <Link href="/signup" className="text-orange-600 hover:text-orange-700 font-semibold hover:underline">
                Crear cuenta nueva
            </Link>
            </p>
        </div>
        </div>
    );
}