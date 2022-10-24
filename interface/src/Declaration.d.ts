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