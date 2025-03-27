import { Invitation } from '@models/invitation';
import { apiGet, apiPost } from './requestUtils/fetching';
import { InvitationCheckResult } from './types';
import { FormResponse } from '@modular-forms/preact';

export async function isInviteTokenValid(token: string): Promise<InvitationCheckResult> {
    const apiResponse = await apiGet(`invitations/${token}`);
    if (apiResponse.status === 200) {
        const invitation = (await apiResponse.json()) as Invitation;
        return {
            valid: true,
            forAdmin: invitation.forAdmin,
        };
    }

    return {
        valid: false,
    };
}

export async function isSessionTokenValid(token: string) {
    const apiResponse = await apiPost('restoreSession', { token });
    return apiResponse.status === 200;
}

export async function isAdminSession(token: string): Promise<boolean> {
    const apiResponse = await apiGet(`sessions/${token}/isAdmin`);
    if (apiResponse.status !== 200) return false;

    return (await apiResponse.json()) as boolean;
}

export async function createInviteToken(
    userId: number,
    recipient: string,
    forAdmin: boolean
): Promise<FormResponse<Invitation>> {
    const apiResponse = await apiPost('invitations', {
        userId,
        recipient,
        forAdmin,
    });
    if (apiResponse.status === 200) {
        return {
            status: 'success',
            data: (await apiResponse.json()) as Invitation,
        };
    }
    return {
        status: 'error',
    };
}
