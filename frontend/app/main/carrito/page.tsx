import getCarrito from "@/actions/carrito/get";
import TablaCarrito from "./_components/tablaCarrito";
import { Button } from "@nextui-org/react";
import vaciarCarrito from "@/actions/carrito/vaciar";
import ButtonComprar from "./_components/buttonComprar";

export default async function Carrito() {
    const data = await getCarrito();
    const carrito = data.map(ticket => ({
        key: ticket.id,
        ruta: typeof ticket.ruta === "number" ? ticket.ruta : ticket.ruta.id,
        fecha: ticket.fecha,
        hora: ticket.hora,
        asiento: ticket.asiento
    }));

    return (
        <div className="flex flex-col justify-center items-center size-full">
            <div className="flex flex-col w-[600px] max-w-[90%]">
                <TablaCarrito carrito={carrito} />
                <div className="flex flex-row justify-evenly mt-10 gap-16">
                    <form action={vaciarCarrito} className="w-full">
                        <Button color="danger" type="submit" fullWidth>Vaciar carrito</Button>
                    </form>
                    <div className="w-full">
                        <ButtonComprar />
                    </div>
                </div>
            </div>
        </div>
    );
}