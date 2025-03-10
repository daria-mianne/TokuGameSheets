import { apiPost } from './requestUtils/fetching';
import { LoginResult, SignupResult, SuccessfulLoginResponse } from './types';

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

export async function signup(
    inviteToken: string,
    username: string,
    password: string,
    displayName?: string,
    recoveryEmail?: string,
    isAdmin?: boolean
): Promise<SignupResult> {
    const apiResponse = await apiPost('signup', {
        inviteToken,
        username,
        displayName,
        password,
        recoveryEmail,
        isAdmin,
    });
    if (apiResponse.status === 200) {
        const response = await apiResponse.json();
        return response as SignupResult;
    }
    return { id: null };
}

export async function logout(token: string) {
    await apiPost('logout', { token });
}
