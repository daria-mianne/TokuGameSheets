export interface User {
    id: number;
    username: string;
    displayName?: string;
    recoveryEmail?: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
