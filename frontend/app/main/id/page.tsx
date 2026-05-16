import getRuta from "@/actions/rutas/getOne";
import { redirect } from "next/navigation";
import ComprarBoletos from "./_components/comprarBoletos";

export default async function RedirectPage({ params: { id } }: { params: { id: string } }) {
    const idNumber = Number(id);
    const ruta = await getRuta(idNumber);
    
    if (isNaN(idNumber) || !ruta) {
        return redirect("/");
    }

    return (
        <ComprarBoletos ruta={ruta} />
    );
}