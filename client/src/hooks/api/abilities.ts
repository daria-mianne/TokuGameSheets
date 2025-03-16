import { Ability } from '@models/ability';
import { apiDelete, apiGet, apiPost } from './requestUtils/fetching';

export async function getAbility(id: number) {
    const apiResponse = await apiGet(`abilities/${id}`);
    if (apiResponse.status === 200) {
        return (await apiResponse.json()) as Ability;
    }
    return null;
}

export async function listAbilities() {
    const apiResponse = await apiGet('abilities');
    if (apiResponse.status === 200) {
        return (await apiResponse.json()) as Ability[];
    }
    return [];
}

export async function createAbility(ability: Ability) {
    const apiResponse = await apiPost('abilities', ability);
    if (apiResponse.status === 200) {
        return (await apiResponse.json()) as number;
    }
    return null;
}

export async function updateAbility(ability: Ability) {
    if (!ability.id) {
        throw new Error('Must have ability id to update ability');
    }
    const apiResponse = await apiPost(`abilities/${ability.id}`, ability);
    return apiResponse.status === 200;
}

export async function deleteAbility(id: number) {
    const apiResponse = await apiDelete(`abilities/${id}`);
    return apiResponse.status === 200;
}
