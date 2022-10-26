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
}

interface Ocupation {
    startAt: Date;
    customer: Customer;

    timeInfo: string;
}

interface Room {
    id: number;
    ocupationInfo: Ocupation | null;
}