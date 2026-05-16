'use client';

import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

interface TicketItem {
    key: string;
    ruta: number;
    fecha: string;
    hora: string;
    asiento: number;
}

export default function TablaCarrito({ carrito }: { carrito: TicketItem[] }) {
    const columns = [
        { key: "ruta", label: "Ruta" },
        { key: "fecha", label: "Fecha" },
        { key: "hora", label: "Hora" },
        { key: "asiento", label: "Asiento" }
    ];

    return (
        <Table className="max-h-[90%]">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody emptyContent="Carrito vacío" items={carrito}>
                {(ticket) => (
                    <TableRow key={ticket.key}>
                        {(colKey) => (
                            <TableCell>{getKeyValue(ticket, colKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}