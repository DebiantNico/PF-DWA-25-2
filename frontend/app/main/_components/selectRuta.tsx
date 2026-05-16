'use client';

import { Ciudad, Ruta } from "@/entities";
import { Button, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuArrowUpDown } from "react-icons/lu";

export default function SelectRuta({ rutas, ciudades }: { rutas: Ruta[], ciudades: Ciudad[] }) {
    const [desde, setDesde] = useState("");
    const [hacia, setHacia] = useState("");

    const [ciudadesDesde, setCiudadesDesde] = useState(ciudades);
    const [ciudadesHacia, setCiudadesHacia] = useState(ciudades);

    const [ruta, setRuta] = useState<number>();

    const invertirRuta = () => {
        const tempDesde = desde;
        setDesde(hacia);
        setHacia(tempDesde);
    };

    useEffect(() => {
        if (hacia) {
            setCiudadesDesde(
                rutas
                    .map(r => (r.hacia.id === hacia ? r.desde : null))
                    .filter(id => id !== null) as Ciudad[]
            );
            if (desde) {
                setRuta(rutas.find(r => r.desde.id === desde && r.hacia.id === hacia)?.id);
            } else {
                setRuta(undefined);
            }
        } else {
            setCiudadesDesde(ciudades);
        }

        if (desde) {
            setCiudadesHacia(
                rutas
                    .map(r => (r.desde.id === desde ? r.hacia : null))
                    .filter(id => id !== null) as Ciudad[]
            );
        } else {
            setCiudadesHacia(ciudades);
        }
    }, [desde, hacia, rutas, ciudades]);

    return (
        <form className="w-[600px] max-w-[90vw] flex flex-col gap-8">
            <Select label="Inicio" selectedKeys={desde ? [desde] : []} onChange={(e) => setDesde(e.target.value)}>
                {ciudadesDesde.map(ciudad => (
                    <SelectItem key={ciudad.id} value={ciudad.id}>
                        {`${ciudad.nombre}, ${ciudad.estado}`}
                    </SelectItem>
                ))}
            </Select>
            <Button color="default" className="w-1/3 self-center" onPress={invertirRuta}>
                <LuArrowUpDown />
            </Button>
            <Select label="Destino" selectedKeys={hacia ? [hacia] : []} onChange={(e) => setHacia(e.target.value)}>
                {ciudadesHacia.map(ciudad => (
                    <SelectItem key={ciudad.id} value={ciudad.id}>
                        {`${ciudad.nombre}, ${ciudad.estado}`}
                    </SelectItem>
                ))}
            </Select>
            {ruta ? (
                <Link href={`/${ruta}`}>
                    <Button color="warning" className="w-full">
                        Compra ahora
                    </Button>
                </Link>
            ) : (
                <Button color="default" className="w-full" isDisabled>
                    Compra ahora
                </Button>
            )}
        </form>
    );
}