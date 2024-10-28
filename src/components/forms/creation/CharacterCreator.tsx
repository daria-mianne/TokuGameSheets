import { useState } from 'preact/hooks';

const MIN_PERSONALITY_TRAITS = 1;
const MIN_NPC_RELATIONSHIPS = 2;

function generatePersonalityTraitInputs(numPersonalityTraits: number) {
    const inputs: unknown[] = []; // FIXME: real typing
    for (let id = 0; id < numPersonalityTraits; id++) {
        inputs.push(
            <label>
                Trait {id + 1}:&nbsp;
                <input id={`PersonalityTrait${id}`} type='text' maxLength={1000} required={id < MIN_PERSONALITY_TRAITS} />
            </label>
        );
    }
    return inputs;
}

function generateNPCRelationshipInputs(numNPCRelationships: number) {
    const inputs: unknown[] = []; // FIXME: real typing
    for (let id = 0; id < numNPCRelationships; id++) {
        inputs.push(
            <label>
                Relationship {id + 1}:&nbsp;
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <label>
                        NPC name (max length 200 chars):&nbsp;
                        <input id={`NPCRelName${id}`} type='text' maxLength={200} required={id < MIN_NPC_RELATIONSHIPS} />
                    </label>
                    <label>
                        Relationship Type:&nbsp;
                        <select id={`NPCRelType${id}`} required={id < MIN_NPC_RELATIONSHIPS}>
                            <option value='positive'>Positive</option>
                            <option value='neutral'>Neutral</option>
                            <option value='negative'>Negative</option>
                        </select>
                    </label>
                    <label>
                        Relationship Description (max length 1,000 chars):&nbsp;
                        <textarea
                            id={`NPCRelDesc${id}`}
                            rows={1}
                            maxLength={1000}
                            required={id < MIN_NPC_RELATIONSHIPS}
                            style={{
                                resize: 'both',
                            }}
                        />
                    </label>
                </div>
            </label>
        );
    }
    return inputs;
}

export default function CharacterCreator() {
    const [numPersonalityTraits, setNumPersonalityTraits] = useState(MIN_PERSONALITY_TRAITS);
    const [numNPCRelationships, setNumNPCRelationships] = useState(MIN_NPC_RELATIONSHIPS);

    return (
        <>
            <h1>Character Creator</h1>
            <form id='CharacterCreation'>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <label>
                        Character Name (max length 200 chars):
                        <input id='CharacterName' type='text' maxLength={200} required={true} />
                    </label>
                    <label>
                        Character Pronouns (max length 100 chars):
                        <input id='CharacterPronouns' type='text' maxLength={100} required={true} />
                    </label>
                    <label>
                        Ranger Color (max length 50 chars):
                        <input id='RangerColor' type='text' maxLength={50} required={true} />
                    </label>
                    <label>
                        Personality Traits:
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {generatePersonalityTraitInputs(numPersonalityTraits)}
                        </div>
                        <button type='button' onClick={() => setNumPersonalityTraits(numPersonalityTraits + 1)}>
                            Add another Trait
                        </button>
                    </label>
                    <label>
                        Personal Abilities:
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;This section to come in a later update.
                    </label>
                    <label>
                        Notable NPC Relationships:
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {generateNPCRelationshipInputs(numNPCRelationships)}
                        </div>
                        <button type='button' onClick={() => setNumNPCRelationships(numNPCRelationships + 1)}>
                            Add another NPC Relationship
                        </button>
                    </label>
                    <input type='submit' value='Submit' />
                </div>
            </form>
        </>
    );
}
