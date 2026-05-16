'use client';

import { Ruta } from "@/entities";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Button, DatePicker, Form, Input, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import DiagramaCamion from "./diagramaCamion";
import llenarCarrito from "@/actions/carrito/llenar";

export default function ComprarBoletos({ ruta }: { ruta: Ruta }) {
    const [seleccionados, setSeleccionados] = useState<boolean[]>(new Array(50).fill(false));
    
    const asientosFiltrados = seleccionados
        .map((sel, i) => (sel ? (i + 1) : null))
        .filter(i => i !== null) as number[];

    const carritoConAsientos = llenarCarrito.bind(null, asientosFiltrados);

    return (
        <div className="flex flex-col w-full items-center py-6 overflow-hidden overflow-y-auto h-full">
            <Form className="flex flex-col w-[600px] max-w-[90vw] gap-4" action={carritoConAsientos}>
                <h1 className="text-sm mb-4">
                    <Link href="/" className="underline hover:text-warning transition-colors">
                        Página principal:
                    </Link>
                    {` ${ruta.desde.nombre}, ${ruta.desde.estado} > ${ruta.hacia.nombre}, ${ruta.hacia.estado}`}
                </h1>
                
                <Input type="hidden" name="ruta" value={ruta.id.toString()} />
                
                <DatePicker 
                    name="fecha" 
                    label="Fecha" 
                    isRequired 
                    minValue={today(getLocalTimeZone())}
                />
                
                <Select name="hora" label="Hora" isRequired>
                    {ruta.horario.map(hora => {
                        const horaFormateada = hora.slice(0, 5);
                        return (
                            <SelectItem key={horaFormateada} value={horaFormateada}>
                                {horaFormateada}
                            </SelectItem>
                        );
                    })}
                </Select>
                
                <DiagramaCamion seleccionados={seleccionados} setSeleccionados={setSeleccionados} />
                
                <Button 
                    fullWidth 
                    type="submit" 
                    color="warning" 
                    isDisabled={asientosFiltrados.length === 0}
                >
                    Añadir al carrito
                </Button>
            </Form>
        </div>
    );
}