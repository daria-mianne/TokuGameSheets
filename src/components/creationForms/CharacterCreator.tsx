import { useState } from "preact/hooks";

function generatePersonalityTraitInputs(numPersonalityTraits: number) {
    const inputs: unknown[] = []; // FIXME: real typing
    for (let id = 0; id < numPersonalityTraits; id++) {
        inputs.push(<label>
            Trait {id + 1}:&nbsp;
            <input id={`PersonalityTrait${id}`} type="text" maxLength={1000} />
        </label>);
    }
    return inputs;
}

function generateNPCRelationshipInputs(numNPCRelationships: number) {
    const inputs: unknown[] = []; // FIXME: real typing
    for (let id = 0; id < numNPCRelationships; id++) {
        inputs.push(<label>
            Relationship {id + 1}:&nbsp;
            <div style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
                <label>
                    NPC:&nbsp;<input id={`NPCRelName${id}`} type='text' maxLength={200} />
                </label>
                <label>
                    Relationship Type:&nbsp;
                    <select id={`NPCRelType${id}`}>
                        <option value="positive">Positive</option>
                        <option value="neutral">Neutral</option>
                        <option value="negative">Negative</option>
                    </select>
                </label>
                <label>
                    Relationship Description:&nbsp;
                    <textarea id={`NPCRelDesc${id}`} rows={1} maxLength={1000} style={{
                        resize: "both",
                    }} />
                </label>
            </div>
        </label>)
    }
    return inputs;
}

export function CharacterCreator() {
    const [numPersonalityTraits, setNumPersonalityTraits] = useState(1);
    const [numNPCRelationships, setNumNPCRelationships] = useState(2);

    return (<>
        <h1>Character Creator</h1>
        <form id="CharacterCreation">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <label>
                    Character Name:
                    <input id="CharacterName" type="text" maxLength={200} />
                </label>
                <label>
                    Character Pronouns:
                    <input id="CharacterPronouns" type="text" maxLength={100} />
                </label>
                <label>
                    Ranger Color:
                    <input id="RangerColor" type="text" maxLength={50} />
                </label>
                <label>
                    Personality Traits:
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        { generatePersonalityTraitInputs(numPersonalityTraits) }
                    </div>
                    <button type="button" onClick={
                        () => setNumPersonalityTraits(numPersonalityTraits + 1)
                    }>
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
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        { generateNPCRelationshipInputs(numNPCRelationships) }
                    </div>
                    <button type="button" onClick={
                        () => setNumNPCRelationships(numNPCRelationships + 1)
                    }>
                        Add another NPC Relationship
                    </button>
                </label>
                <input type="submit" value="Submit" />
            </div>
        </form>
    </>);
}