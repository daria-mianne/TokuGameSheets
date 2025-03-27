import { User } from '@models/user';
import { apiPost } from './requestUtils/fetching';
import { LoginResult, SignupResult, SuccessfulLoginResponse } from './types';
import { FormResponse } from '@modular-forms/preact';

export async function login(username: string, password: string): Promise<LoginResult> {
    const apiResponse = await apiPost('login', {
        username,
        password,
    });
    if (apiResponse.status === 200) {
        return (await apiResponse.json()) as SuccessfulLoginResponse;
    }
    return { token: null, user: null };
}

export async function restoreSession(token: string) {
    const apiResponse = await apiPost('restoreSession', { token });
    if (apiResponse.status === 200) {
        return (await apiResponse.json()) as User;
    }
    return null;
}

export async function signup(
    inviteToken: string,
    username: string,
    password: string,
    displayName?: string,
    recoveryEmail?: string,
    isAdmin?: boolean
): Promise<FormResponse<SignupResult>> {
    const apiResponse = await apiPost('signup', {
        inviteToken,
        username,
        displayName,
        password,
        recoveryEmail,
        isAdmin,
    });
    if (apiResponse.status === 200) {
        return {
            status: 'success',
            data: (await apiResponse.json()) as SignupResult,
        };
    }
    return { status: 'error' };
}

export async function logout(token: string) {
    await apiPost('logout', { token });
}
