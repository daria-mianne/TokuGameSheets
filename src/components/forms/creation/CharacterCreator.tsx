import { useState } from 'preact/hooks';
import { SimpleTextField } from '../fields/SimpleTextField';

const MIN_PERSONALITY_TRAITS = 1;
const MIN_NPC_RELATIONSHIPS = 2;

function generatePersonalityTraitInputs(numPersonalityTraits: number) {
    const inputs: unknown[] = []; // FIXME: real typing
    for (let id = 0; id < numPersonalityTraits; id++) {
        inputs.push(
            <label>
                Trait {id + 1}:<br />
                <SimpleTextField id={`PersonalityTrait${id}`} maxLength={1000} required={id < MIN_PERSONALITY_TRAITS} onSave={() => {} /*FIXME*/} />
            </label>
        );
    }
    return inputs;
}

function generateNPCRelationshipInputs(numNPCRelationships: number) {
    const inputs: unknown[] = []; // FIXME: real typing
    for (let id = 0; id < numNPCRelationships; id++) {
        inputs.push(
            <>
                <label>
                    Relationship {id + 1}:<br />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <label>
                            NPC name (max length 200 chars):
                            <br />
                            <SimpleTextField
                                id={`NPCRelName${id}`}
                                maxLength={200}
                                required={id < MIN_NPC_RELATIONSHIPS}
                                onSave={() => {} /*FIXME*/}
                            />
                        </label>
                        <br />
                        <label>
                            Relationship Type:
                            <br />
                            <select id={`NPCRelType${id}`} required={id < MIN_NPC_RELATIONSHIPS}>
                                <option value='positive'>Positive</option>
                                <option value='neutral'>Neutral</option>
                                <option value='negative'>Negative</option>
                            </select>
                        </label>
                        <br />
                        <label>
                            Relationship Description (max length 1,000 chars):
                            <br />
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
                <br />
            </>
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
                        <br />
                        <SimpleTextField id='CharacterName' maxLength={200} required={true} onSave={() => {} /*FIXME*/} />
                    </label>
                    <br />
                    <label>
                        Character Pronouns (max length 100 chars):
                        <br />
                        <SimpleTextField id='CharacterPronouns' maxLength={100} required={true} onSave={() => {} /*FIXME*/} />
                    </label>
                    <br />
                    <label>
                        Ranger Color (max length 50 chars):
                        <br />
                        <SimpleTextField id='RangerColor' maxLength={50} required={true} onSave={() => {} /*FIXME*/} />
                    </label>
                    <br />
                    <label>
                        Personality Traits:
                        <br />
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
                    <br />
                    <label>
                        Personal Abilities:
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;This section to come in a later update.
                    </label>
                    <br />
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
