import Invitation from "@models/invitation";

export interface BadRequestResponse {
    status: 400;
}

export interface ApiResponse {
    status: number;
    json: () => Promise<unknown>;
}

export interface GetInvitationResponse {
    invitation: Invitation;
}

export type InvitationCheckResult = {
    valid: true;
    forAdmin: boolean;
} | {
    valid: false;
}

export interface SuccessfulLoginResponse {
    token: string;
}

export interface LoginResult {
    token: string | null;
}

export interface SignupResult {
    id: number | null;
}