import { useState } from 'preact/hooks';
import { Form, FormAction, FormArray } from '@shelacek/formica';
import { CharacterDetails, RangerColor, RelationshipValence } from './types';
import { startCase } from 'lodash';

const MIN_PERSONALITY_TRAITS = 1;
const MIN_NPC_RELATIONSHIPS = 2;

export default function CharacterCreator() {
    const [formData, setFormData] = useState<CharacterDetails>({
        name: '',
        pronouns: '',
        color: RangerColor.UNKNOWN,
        personalityTraits: [
            {
                trait: '',
            },
        ],
        personalAbilities: [],
        npcRelationships: [
            {
                name: '',
                valence: RelationshipValence.NEUTRAL,
                description: '',
            },
        ],
    });

    const handleChange = (value: CharacterDetails) => {
        if (formData.personalityTraits.length < MIN_PERSONALITY_TRAITS) {
            // TODO: Invalidate form
        }
        if (formData.npcRelationships.length < MIN_NPC_RELATIONSHIPS) {
            // TODO: Invalidate form
        }
        setFormData(value);
    };

    const handleSubmit = (event: Event) => {
        if ((event.target as HTMLFormElement)?.checkValidity()) {
            // TODO: API call
        }
        console.log('Character Creator Form Data', formData); // TODO: Remove this
    };

    return (
        <>
            <h1>Character Creator</h1>
            <Form class='validated' value={formData} onChange={handleChange} onSubmit={handleSubmit}>
                <h2>Basic Attributes</h2>
                <label>
                    Character Name (max length 200 chars):
                    <br />
                    <input type='text' name='name' maxLength={200} required />
                </label>
                <br />
                <label>
                    Character Pronouns (max length 100 chars):
                    <br />
                    <input type='text' name='pronouns' maxLength={100} required />
                </label>
                <br />
                <label>
                    Ranger Color:
                    <br />
                    <select name='color' required>
                        {Object.values(RangerColor).map((color) => (
                            <option value={color}>{startCase(color)}</option>
                        ))}
                    </select>
                </label>
                <br />
                <h2>Personality Traits</h2>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <FormArray name='personalityTraits'>
                        <div style={{ flexDirection: 'row' }}>
                            <label>
                                Trait <input type='text' name='trait' maxLength={1000} required />
                            </label>
                            <FormAction>
                                {(actionProps) => {
                                    if (actionProps?.remove)
                                        return (
                                            <button type='button' onClick={actionProps.remove}>
                                                Remove Trait
                                            </button>
                                        );
                                    return null;
                                }}
                            </FormAction>
                        </div>
                    </FormArray>
                    <FormAction name='personalityTraits' item={{ trait: '' }}>
                        {(actionProps) => {
                            if (actionProps?.add)
                                return (
                                    <button type='button' onClick={actionProps.add}>
                                        Add another Trait
                                    </button>
                                );
                            return null;
                        }}
                    </FormAction>
                </div>
                <br />
                <h2>Personal Abilities</h2>
                This section to come in a later update.
                <br />
                <h2>Notable NPC Relationships</h2>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <FormArray name='npcRelationships'>
                        <label>
                            NPC name (max length 200 chars) <input type='text' name='name' maxLength={200} required />
                        </label>
                        <br />
                        <label>
                            Relationship Type{' '}
                            <select name='valence' required>
                                {Object.values(RelationshipValence).map((valence) => (
                                    <option value={valence}>{startCase(valence)}</option>
                                ))}
                            </select>
                        </label>
                        <br />
                        <label>
                            Relationship Description (max length 1,000 chars){' '}
                            <textarea
                                name='description'
                                rows={1}
                                maxLength={1000}
                                required
                                style={{
                                    resize: 'both',
                                }}
                            />
                        </label>
                        <br />
                        <FormAction>
                            {(actionProps) => {
                                if (actionProps?.remove)
                                    return (
                                        <button type='button' onClick={actionProps.remove}>
                                            Remove Relationship
                                        </button>
                                    );
                                return null;
                            }}
                        </FormAction>
                    </FormArray>
                    <FormAction
                        name='npcRelationships'
                        item={{
                            name: '',
                            valence: RelationshipValence.NEUTRAL,
                            description: '',
                        }}
                    >
                        {(actionProps) => {
                            if (actionProps?.add)
                                return (
                                    <button type='button' onClick={actionProps.add}>
                                        Add another NPC Relationship
                                    </button>
                                );
                            return null;
                        }}
                    </FormAction>
                </div>
                <input type='submit' value='Submit' />
            </Form>
        </>
    );
}
