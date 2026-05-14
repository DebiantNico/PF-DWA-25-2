import Link from "next/link";
import Image from "next/image";
import getRutas from "../actions/rutas/get";
import { Ruta } from "../entities";

export default async function HomePage() {
  const rutas: Ruta[] = await getRutas();

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 text-white py-16 px-6 sm:px-12 shadow-md relative overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 text-center md:text-left">
            <span className="bg-orange-500/30 text-orange-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-orange-400/30">
              Transporte Ejecutivo
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Conectando tus destinos
            </h1>
            <p className="text-lg text-orange-50 max-w-xl font-medium leading-relaxed">
              Encuentra tus boletos al mejor precio. Selecciona tu ruta, elige tu asiento favorito y asegura tu viaje con nuestra plataforma segura.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center w-full max-w-xs sm:max-w-sm hidden lg:block">
            <p className="text-sm font-semibold text-orange-100 mb-1">Confianza en el camino</p>
            <p className="text-2xl font-bold">Rutas Activas</p>
            <div className="text-5xl font-extrabold text-orange-200 my-2">
              {rutas.length > 0 ? rutas.length : "..."}
            </div>
            <p className="text-xs text-orange-100/80">Salidas puntuales garantizadas</p>
          </div>
        </div>

        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/5 rounded-full blur-xl"></div>
      </section>

      <section className="max-w-5xl mx-auto py-12 px-6 sm:px-12">
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Viajes Disponibles</h2>
            <p className="text-sm text-gray-500 mt-1">Selecciona tu trayecto para consultar disponibilidad</p>
          </div>
        </div>

        {rutas.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center shadow-sm">
            <p className="text-lg font-semibold text-gray-600 mb-2">
              No se encontraron rutas programadas
            </p>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Asegúrate de que el backend y la base de datos estén encendidos correctamente en tu terminal o contenedor.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rutas.map((ruta) => (
              <div 
                key={ruta.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-5 py-3 border-b border-gray-100 flex justify-between items-center">
                  <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">
                    Ruta #{ruta.id}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded">
                    Disponible
                  </span>
                </div>

                <div className="p-5 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 font-medium">SALIDA DESDE</p>
                    <p className="text-lg font-bold text-gray-900 line-clamp-1">
                      {ruta.desde?.nombre || "Ciudad Origen"}
                    </p>
                    <p className="text-xs text-gray-500">{ruta.desde?.estado || ""}</p>
                  </div>

                  <div className="text-orange-500 group-hover:translate-x-1 transition-transform duration-200 bg-orange-50 p-2 rounded-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </div>

                  <div className="flex-1 text-right">
                    <p className="text-xs text-gray-400 font-medium">LLEGADA HACIA</p>
                    <p className="text-lg font-bold text-gray-900 line-clamp-1">
                      {ruta.hacia?.nombre || "Ciudad Destino"}
                    </p>
                    <p className="text-xs text-gray-500">{ruta.hacia?.estado || ""}</p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-50 mt-auto">
                  <div className="w-full sm:w-auto">
                    <p className="text-xs text-gray-400 font-medium mb-1">HORARIOS</p>
                    <div className="flex flex-wrap gap-1">
                      {ruta.horario && ruta.horario.length > 0 ? (
                        ruta.horario.map((hora, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 font-mono text-xs px-2 py-0.5 rounded font-semibold">
                            {hora.slice(0, 5)}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">Sin definir</span>
                      )}
                    </div>
                  </div>

                  <Link 
                    href={`/purchase/${ruta.id}`}
                    className="w-full sm:w-auto text-center bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors shadow-sm"
                  >
                    Reservar Asiento
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}