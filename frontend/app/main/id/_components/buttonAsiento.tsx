'use client';

import { Button } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

export default function BotonAsiento({ asiento, seleccionados, setSeleccionados }: {
    asiento: number;
    seleccionados: boolean[];
    setSeleccionados: Dispatch<SetStateAction<boolean[]>>;
}) {
    const ind = asiento - 1;

    const toggleAsiento = () => {
        const nuevosSeleccionados = [...seleccionados];
        nuevosSeleccionados[ind] = !nuevosSeleccionados[ind];
        setSeleccionados(nuevosSeleccionados);
    };

    return (
        <Button 
            color={seleccionados[ind] ? "warning" : "default"} 
            className="w-1/10 p-0"
            onPress={toggleAsiento}
        >
            {asiento}
        </Button>
    );
}