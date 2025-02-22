export interface AccountCreationData {
    username: string;
    password: string;
    confirmPassword: string;
    displayName: string;
    recoveryEmail: string;
    confirmEmail: string;
}

export interface InvitationData {
    isAdmin: boolean;
    recipient: string;
}
