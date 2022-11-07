import { Customer } from "./model/Customer";
import { User } from "./model/User";

declare global {
    namespace Express {
        export interface Request {
            user?: User;
        }
    }
}

export interface Ocupation {
    startAt: Date;
    customer: Customer;
}

export interface FrontConsumption {
    id: number;
    name: string;
    quantity: number;
    total: number;
}

export interface Room {
    id: number;
    roomNumber: number;
    ocupationInfo: Ocupation | null;
    consumptions: FrontConsumption[];
    cleared: boolean;
}

export interface PermissionInfo {
    code: string;
    name: string;
}

export interface DashboardCards {
    estoque: number;
    clientes: number;
    faturamento: number;

    quartosOcupados: number;
    quartosLivres: number;
    quartosAguardandoLimpeza: number;
}