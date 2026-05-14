'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Input, Spinner } from '@nextui-org/react';
import signup from '@/actions/auth/signup'; 

export default function SignupPage() {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
        setErrorMessage('Las contraseñas no coinciden.');
        setSubmitting(false);
        return;
        }

        try {
        const response = await signup({ email, password });
        
        if (response === 201) {
            router.push('/login');
        } else {
            setErrorMessage('El correo ya está registrado o los datos son inválidos.');
        }
        } catch (error) {
        setErrorMessage('Ocurrió un error al procesar el registro.');
        } finally {
        setSubmitting(false);
        }
    };

    return (
        <div>
        <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Crea tu cuenta</h1>
            <p className="text-sm text-gray-500 mt-1">Comienza a reservar tus boletos hoy mismo</p>
        </div>

        {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg text-center font-medium">
            {errorMessage}
            </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
            <Input
            isRequired
            name="email"
            label="Correo electrónico"
            type="email"
            variant="bordered"
            size="md"
            />

            <Input
            isRequired
            name="password"
            label="Contraseña"
            type="password"
            variant="bordered"
            size="md"
            description="Mínimo 8 caracteres"
            />

            <Input
            isRequired
            name="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            variant="bordered"
            size="md"
            />

            <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold shadow-md hover:opacity-90 mt-4"
            size="lg"
            >
            {submitting ? <Spinner color="white" size="sm" /> : 'Registrarse'}
            </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="text-orange-600 hover:text-orange-700 font-semibold hover:underline">
                Iniciar sesión
            </Link>
            </p>
        </div>
        </div>
    );
}