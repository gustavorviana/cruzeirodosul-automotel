interface Permission {
    code: string;
    name: string;
}

interface Group {
    id: number;
    name: string;
    description: string;
    permissions: Permission[];
}

interface User {
    id: number;
    group: Group;
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

interface Consumption {
    name: string;
    quantity: number;
    total: number;
}

interface Room {
    id: number;
    roomNumber: number;
    ocupationInfo: Ocupation | null;
    cleared: boolean;
}

interface Consumptions {
    id: number,
    stockId: number,
    bedroomHistoryId: number,
    quantity: number,
    Stock: Stock;
}

interface RoomHistory {
    id: number,
    customerId: number,
    userId: number,
    bedroomId: number,
    enterAt: Date,
    cleanedAt: Date | null,
    leaveAt: Date | null,
    customer: Customer,
    Consumptions: Consumptions;
    bedroom: Room;
}

interface DashboardCards {
    estoque: number;
    clientes: number;
    faturamento: number;

    quartosOcupados: number;
    quartosLivres: number;
    quartosAguardandoLimpeza: number;
}