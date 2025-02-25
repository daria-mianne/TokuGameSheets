export enum AbilityType {
    ARMORY = 'armory',
    ICONIC = 'iconic',
    PERSONAL = 'personal',
    TEAM = 'team',
}

export type AbilityMechanics = null; // FIXME: Add real AbilityMechanics type

export interface AbilityDesign {
    name: string;
    type: AbilityType;
    description: string;
    mechanics: AbilityMechanics;
}
