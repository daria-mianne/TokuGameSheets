export enum RangerColor {
    NOT_A_RANGER = 'not a ranger',
    UNKNOWN = 'unknown',
    RED = 'red',
    ORANGE = 'orange',
    YELLOW = 'yellow',
    GREEN = 'green',
    BLUE = 'blue',
    PURPLE = 'purple',
    SILVER = 'silver',
    GOLD = 'gold',
    // TODO: more?
}

export enum RelationshipValence {
    POSITIVE = 1,
    NEUTRAL = 0,
    NEGATIVE = -1,
}

export type NpcRelationship = {
    id?: number;
    npcId: number;
    valence: RelationshipValence;
    description: string;
};

export type PersonalityTrait = {
    id?: number;
    characterId?: number;
    description: string;
};

export type Character = {
    id?: number;
    userId: number; // the user who owns this character
    isNpc: boolean;
    name: string;
    pronouns: string;
    backstoryText: string;
    color: RangerColor | null;
    personalityTraits: PersonalityTrait[];
    personalAbilities?: number[];
    npcRelationships: NpcRelationship[];
};
