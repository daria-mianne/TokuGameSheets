export enum RangerColor {
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
    POSITIVE = 'positive',
    NEUTRAL = 'neutral',
    NEGATIVE = 'negative',
}

export interface NpcRelationship {
    name: string;
    valence: RelationshipValence;
    description: string;
}

export interface CharacterDetails {
    name: string;
    pronouns: string;
    color: RangerColor;
    personalityTraits: { trait: string }[];
    personalAbilities: never[]; // FIXME: Real type when ability creation is more done
    npcRelationships: NpcRelationship[];
}