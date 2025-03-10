import Invitation from '@models/invitation';
import { apiGet, apiPost } from './requestUtils/fetching';
import { InvitationCheckResult } from './types';

export async function checkInviteToken(token: string): Promise<InvitationCheckResult> {
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

export async function checkSessionToken(token: string) {
    const apiResponse = await apiPost('restoreSession', { token });
    return apiResponse.status === 200;
}
