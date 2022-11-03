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
    timeInfo: string;
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
}