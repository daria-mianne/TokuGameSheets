export enum AbilityType {
    ARMORY = 'armory',
    ICONIC = 'iconic',
    PERSONAL = 'personal',
    TEAM = 'team',
}

export type AbilityMechanics = null; // FIXME: Add real AbilityMechanics type

export interface Ability {
    id?: number;
    adminOnly: boolean;
    name: string;
    type: AbilityType;
    description: string;
    mechanics?: AbilityMechanics; // TODO: Make this non-optional when it's actually implemented
}
