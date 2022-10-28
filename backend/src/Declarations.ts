import { Customer } from "./model/Customer";

export interface Ocupation {
    startAt: Date;
    customer: Customer;

    timeInfo: string;
}

export interface Room {
    id: number;
    roomNumber: number;
    ocupationInfo: Ocupation | null;
}