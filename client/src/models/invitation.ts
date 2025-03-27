export type Invitation = {
    id?: number;
    guid?: string;
    invitingUserId: number;
    forAdmin: boolean;
    recipient: string;
};
