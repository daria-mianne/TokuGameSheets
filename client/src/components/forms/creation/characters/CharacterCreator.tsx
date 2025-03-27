import { useEffect, useState } from 'preact/hooks';
import { Form, FormAction, FormArray } from '@shelacek/formica';
import { Character, RangerColor, RelationshipValence } from '@models/character';
import { startCase } from 'lodash';
import { createCharacter, listNpcs } from '@hooks/api/characters';
import ErrorBanner from '@components/forms/ErrorBanner';
import { Loading } from '@components/Loading';
import { useMemoryOnlyDataStore } from '@datastore/memoryOnlyData';
import { getEnumKeys } from '@utils/enumUtils';

const MIN_PERSONALITY_TRAITS = 1;
const MIN_NPC_RELATIONSHIPS = 2;

export default function CharacterCreator() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const { currentUser } = useMemoryOnlyDataStore();
    const [formData, setFormData] = useState<Character>({
        userId: currentUser?.id ?? -1,
        name: '',
        pronouns: '',
        backstoryText: '',
        isNpc: false,
        color: RangerColor.UNKNOWN,
        personalityTraits: [
            {
                description: '',
            },
        ],
        personalAbilities: [],
        npcRelationships: [
            {
                npcId: -1,
                valence: RelationshipValence.NEUTRAL,
                description: '',
            },
        ],
    });

    const [npcs, setNpcs] = useState<Character[]>([]);

    useEffect(() => {
        listNpcs().then(setNpcs);
    }, []);

    const handleChange = (value: Character) => {
        if (formData.personalityTraits.length < MIN_PERSONALITY_TRAITS) {
            // TODO: Invalidate form
        }
        if (formData.npcRelationships.length < MIN_NPC_RELATIONSHIPS) {
            // TODO: Invalidate form
        }
        setFormData(value);
    };

    const handleSubmit = (event: Event) => {
        console.log(formData);
        if (
            !formData.isNpc &&
            (formData.personalityTraits.length < MIN_PERSONALITY_TRAITS ||
                formData.npcRelationships.length < MIN_NPC_RELATIONSHIPS)
        ) {
            // not true validation yet, so return early
            setLoading(false);
            setSubmitted(true);
            setSuccessfulCreation(false);
            return;
        }

        if ((event.target as HTMLFormElement)?.checkValidity()) {
            setLoading(true);
            setSubmitted(true);
            void createCharacter({
                ...formData,
                color: formData.color === RangerColor.NOT_A_RANGER ? null : formData.color,
            }).then((charId) => {
                setSuccessfulCreation(charId !== null);
                setLoading(false);
            });
        } else {
            console.log('failed to submit due to form data not meeting validity checks'); // TODO: better display of invalid form data so the user knows what's happening
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <h1>Character Creator</h1>
            {submitted && !successfulCreation && <ErrorBanner message='Character creation failed. Please try again.' />}
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
                <label>
                    Character is an NPC: <input type='checkbox' name='isNpc' />
                </label>
                <h2>Personality Traits</h2>
                <p>Max length 1,000 chars each.</p>
                <p>Player characters must have a minimum of {MIN_PERSONALITY_TRAITS} personality trait(s).</p>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <FormArray name='personalityTraits'>
                        <div style={{ flexDirection: 'row' }}>
                            <label>
                                Trait <input type='text' name='description' maxLength={1000} required />
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
                <p>Player characters must have a minimum of {MIN_NPC_RELATIONSHIPS} NPC relationship(s).</p>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <FormArray name='npcRelationships'>
                        <label>
                            NPC name{' '}<select name='npcId' required>
                                {npcs.filter((npc) => npc.id !== undefined).map((npc, index) => (
                                    <option key={index} value={npc.id!}>
                                        {npc.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <br />
                        <label>
                            Relationship Type{' '}
                            <select name='valence' required>
                                {getEnumKeys(RelationshipValence).map((valence, index) => (
                                    <option key={index} value={RelationshipValence[valence]}>
                                        {startCase(valence.toLocaleLowerCase())}
                                    </option>
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
                <h2>Backstory</h2>
                <textarea name='backstoryText' rows={10} maxLength={1000000} style={{ resize: 'both' }} />
                <input type='submit' value='Submit' />
            </Form>
        </>
    );
}
