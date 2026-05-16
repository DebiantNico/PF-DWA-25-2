'use client';

import { Card } from "@nextui-org/react";
import BotonAsiento from "./buttonAsiento";
import { Dispatch, SetStateAction } from "react";
import { LuCircleSlash } from "react-icons/lu";

export default function DiagramaCamion({ seleccionados, setSeleccionados }: {
    seleccionados: boolean[];
    setSeleccionados: Dispatch<SetStateAction<boolean[]>>;
}) {
    const filas = seleccionados.reduce<boolean[][]>((resultado, item, ind) => {
        const indNuevo = Math.floor(ind / 4);
        if (!resultado[indNuevo]) {
            resultado[indNuevo] = [];
        }
        resultado[indNuevo].push(item);
        return resultado;
    }, []);

    return (
        <Card className="flex flex-col gap-2 my-6 py-4 w-96 self-center">
            <div className="pl-10 mb-4 w-fit h-12">
                <LuCircleSlash className="size-full text-default-400" />
            </div>
            {filas.map((fila, i) => (
                <div key={i} className="flex flex-row justify-evenly">
                    {fila.map((_, ind) => (
                        <BotonAsiento 
                            key={ind} 
                            asiento={i * 4 + ind + 1}
                            seleccionados={seleccionados} 
                            setSeleccionados={setSeleccionados}
                        />
                    ))}
                </div>
            ))}
        </Card>
    );
}