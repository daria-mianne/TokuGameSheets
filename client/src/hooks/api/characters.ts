import { Character } from "@models/character";
import { apiDelete, apiGet, apiPost } from "./requestUtils/fetching";

export async function getCharacter(id: number) {
    const apiResponse = await apiGet(`characters/${id}`);
    if (apiResponse.status === 200) {
        return (await apiResponse.json()) as Character;
    }
    return null;
}

export async function listCharacters() {
    const apiResponse = await apiGet('characters');
    if (apiResponse.status === 200) {
        return (await apiResponse.json()) as Character[];
    }
    return [];
}

export async function createCharacter(character: Character) {
    const apiResponse = await apiPost('characters', character);
    if (apiResponse.status === 200) {
        return (await apiResponse.json()) as number;
    }
    return null;
}

export async function updateCharacter(character: Character) {
    if (!character.id) {
        throw new Error('Must have character id to update character');
    }
    const apiResponse = await apiPost(`characters/${character.id}`, character);
    return apiResponse.status === 200;
}

export async function deleteCharacter(id: number) {
    const apiResponse = await apiDelete(`characters/${id}`);
    return apiResponse.status === 200;
}
