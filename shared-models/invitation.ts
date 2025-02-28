
// TODO: Determine whether these need to actually be optional
export interface Invitation {
    id?: number;
    guid?: string;
    invitingUserId: number;
    createdAt?: Date;
    deletedAt?: Date;
}