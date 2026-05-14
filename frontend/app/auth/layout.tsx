import Image from 'next/image';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen w-full flex bg-gray-50">
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 md:p-16">
            <div className="w-full max-w-md flex flex-col items-center">
            <div className="mb-8 hover:scale-105 transition-transform duration-300">
                <Image
                src="/Chihuahuenios_logo.png"
                alt="Chihuahueños Bus Logo"
                width={160}
                height={160}
                draggable={false}
                priority
                className="object-contain"
                />
            </div>
            
            <div className="w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                {children}
            </div>
            </div>
        </div>

        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700 relative items-center justify-center p-12 text-white overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 max-w-lg text-center">
            <h2 className="text-4xl font-extrabold tracking-tight leading-tight mb-6">
                Viaja cómodo, seguro y sin complicaciones.
            </h2>
            <p className="text-lg text-orange-50 font-medium leading-relaxed">
                Elige tu destino, selecciona tu asiento ideal y asegura tu lugar en segundos con nuestro sistema de reservas en tiempo real.
            </p>
            </div>
        </div>
        </div>
    );
}