export type AccountCreationData = {
    username: string;
    password: string;
    confirmPassword: string;
    displayName?: string;
    recoveryEmail?: string;
    confirmEmail?: string;
};
