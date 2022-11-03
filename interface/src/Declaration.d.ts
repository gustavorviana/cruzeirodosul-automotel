interface User {
    id: number;
    groupId: number;
    email: string;
    name: string;
}

interface Session {
    id: string;
    user: User;
}

interface Customer {
    id: number;
    name: string;
    document: string;
}

interface Stock {
    id: number;
    productName: string;
    quantity: number;
    price: number;
}

interface Ocupation {
    startAt: Date;
    customer: Customer;

    timeInfo: string;
}

interface Room {
    id: number;
    roomNumber: number;
    ocupationInfo: Ocupation | null;
}