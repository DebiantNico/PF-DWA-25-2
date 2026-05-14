'use client';

import { useState, useEffect } from 'react';

interface Ticket {
  id: string;
  asiento: number;
  comprado: boolean;
}

export default function PurchasePage({ params }: { params: { routeId: string } }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  // Apunta al puerto 4000 del backend que expusimos en Docker
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    // Obtenemos los boletos de la ruta (asumiendo que crearás este endpoint o adaptamos el get)
    fetch(`${API_URL}/rutas/${params.routeId}`)
      .then((res) => res.json())
      .then((data) => {
        // Si tu backend devuelve la ruta con sus tickets anidados:
        setTickets(data.tickets || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar los asientos.');
        setLoading(false);
      });
  }, [params.routeId, API_URL]);

  const handleComprar = async (ticket: Ticket) => {
    setStatusMsg('Procesando compra segura...');
    try {
      // Usamos el endpoint de compra del backend
      const res = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ruta: Number(params.routeId),
          fecha: new Date().toISOString().slice(0, 10),
          hora: "12:00", // Ajustar a la hora seleccionada
          asiento: ticket.asiento,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'El asiento ya fue tomado por otro usuario.');
      }

      setStatusMsg('¡Boleto reservado con éxito!');
      // Actualizamos el estado visual del asiento localmente
      setTickets((prev) =>
        prev.map((t) => (t.asiento === ticket.asiento ? { ...t, comprado: true } : t))
      );
    } catch (err: any) {
      setStatusMsg(err.message);
    }
  };

  if (loading) return <div className="p-10 text-center font-bold">Cargando...</div>;
  if (error) return <div className="p-10 text-center text-red-600 font-bold">{error}</div>;

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Selecciona tu Asiento</h1>
      
      {statusMsg && (
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 font-semibold text-blue-800">
          {statusMsg}
        </div>
      )}

      <div className="grid grid-cols-5 gap-4">
        {tickets.map((t) => (
          <button
            key={t.id || t.asiento}
            disabled={t.comprado}
            onClick={() => handleComprar(t)}
            className={`p-4 rounded-lg font-bold text-lg border transition-all ${
              t.comprado
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400'
                : 'bg-green-100 text-green-800 hover:bg-green-200 border-green-400 shadow-sm'
            }`}
          >
            {t.asiento}
          </button>
        ))}
      </div>
    </main>
  );
}