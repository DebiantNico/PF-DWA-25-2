export interface Ciudad {
    id: string;
    nombre: string;
    estado: string;
    rutasDesde?: Ruta[];
    rutasHacia?: Ruta[];
}

export interface Ruta {
    id: number;
    desde: Ciudad;
    hacia: Ciudad;
    horario: string[];
    tickets?: Ticket[];
}

export interface Usuario {
    id: string;
    email: string;
    password?: string;
    tickets?: Ticket[];
}

export interface Ticket {
    id: string;
    ruta: Ruta | number;
    fecha: string;
    hora: string;
    asiento: number;
    usuario: Usuario;
    comprado: boolean;
}