import { User } from '@models/user';

export interface BadRequestResponse {
    status: 400;
}

export interface ApiResponse {
    status: number;
    json: () => Promise<unknown>;
}

export type InvitationCheckResult =
    | {
          valid: true;
          forAdmin: boolean;
      }
    | {
          valid: false;
      };

export interface SuccessfulLoginResponse {
    token: string;
    user: User;
}

export interface LoginResult {
    token: string | null;
    user: User | null;
}

export interface SignupResult {
    id: number | null;
}
