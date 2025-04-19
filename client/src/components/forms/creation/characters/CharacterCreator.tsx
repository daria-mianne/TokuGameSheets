import { useEffect, useState } from 'preact/hooks';
import { Character, RangerColor, RelationshipValence } from '@models/character';
import { startCase } from 'lodash';
import { createCharacter, listNpcs } from '@hooks/api/characters';
import { Loading } from '@components/Loading';
import { useMemoryOnlyDataStore } from '@datastore/memoryOnlyData';
import { getEnumKeys } from '@utils/enumUtils';
import { insert, maxLength, minLength, remove, required, SubmitHandler, useForm } from '@modular-forms/preact';
import { TextInput } from '@components/forms/inputs/TextInput';
import { TextAreaInput } from '@components/forms/inputs/TextAreaInput';
import { FormFooter } from '@components/forms/inputs/FormFooter';
import { Button } from '@components/base';

const MIN_PERSONALITY_TRAITS = 1;
const MIN_NPC_RELATIONSHIPS = 2;

export default function CharacterCreator() {
    const [loading, setLoading] = useState(false);
    const { currentUser } = useMemoryOnlyDataStore();
    const [characterForm, { Form, Field, FieldArray }] = useForm<Character>({
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

    const handleSubmit: SubmitHandler<Character> = async (values, event) => {
        if (
            !values.isNpc &&
            (values.personalityTraits.length < MIN_PERSONALITY_TRAITS ||
                values.npcRelationships.length < MIN_NPC_RELATIONSHIPS)
        ) {
            // not true validation yet, so return early
            setLoading(false);
            return;
        }

        if ((event.target as HTMLFormElement)?.checkValidity()) {
            setLoading(true);
            void createCharacter({
                ...values,
                color: values.color === RangerColor.NOT_A_RANGER ? null : values.color,
            }).then(() => {
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
            <Form onSubmit={handleSubmit}>
                <h2>Basic Attributes</h2>
                <Field
                    name='name'
                    validate={[
                        maxLength(200, "Your character's name must contain at most 200 characters"),
                        required("Please enter your character's name"),
                    ]}
                >
                    {(field, props) => (
                        <TextInput
                            {...props}
                            type='text'
                            label='Character Name'
                            value={field.value}
                            error={field.error}
                            required
                        />
                    )}
                </Field>
                <Field    // TODO: I hate looking at this thing lol, make the code prettier somehow

                    name='pronouns'
                    validate={[
                        maxLength(100, "Your character's pronouns must contain at most 100 characters"),
                        required("Please enter your character's pronouns"),
                    ]}
                >
                    {(field, props) => (
                        <TextInput
                            {...props}
                            type='text'
                            label='Pronouns'
                            value={field.value}
                            error={field.error}
                            required
                        />
                    )}
                </Field>
                <Field name='color'>
                    {(field, props) => (
                        <label>
                            Ranger Color{' '}
                            <select {...props} required>
                                {Object.values(RangerColor).map((color, index) => (
                                    <option key={index} value={color} selected={field.value.value?.includes(color)}>
                                        {startCase(color)}
                                    </option>
                                ))}
                            </select>
                            <br />
                        </label>
                    )}
                </Field>
                <Field name='isNpc' type='boolean'>
                    {(_, props) => (
                        <label>
                            Is this character an NPC? <input {...props} type='checkbox' />
                        </label>
                    )}
                </Field>
                <h2>Personality Traits</h2>
                <p>Max length 1,000 chars each.</p>
                <p>Player characters must have a minimum of {MIN_PERSONALITY_TRAITS} personality trait(s).</p>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* TODO: Turn this section into its own component */}
                    <FieldArray name='personalityTraits' validate={[
                        minLength(1, 'Character must have at least one trait')
                    ]}>
                        {(fieldArray) =>
                            fieldArray.items.value.map((item, index) => (
                                <div key={item} className='py-2 md:px-2' style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <Field
                                        name={`personalityTraits.${index}.description`}
                                        validate={[
                                            maxLength(1000, 'Personality traits must contain at most 1000 characters'),
                                            required('Please enter a description for your personality trait'),
                                        ]}
                                    >
                                        {(field, props) => (
                                            <TextInput
                                                {...props}
                                                type='text'
                                                value={field.value}
                                                error={field.error}
                                                required
                                            />
                                        )}
                                    </Field>
                                    <Button
                                        label='Remove this trait'
                                        size='small'
                                        onClick={() =>
                                            remove(characterForm, 'personalityTraits', {
                                                at: index,
                                            })
                                        }
                                    />
                                </div>
                            ))
                        }
                    </FieldArray>
                    <Button
                        primary
                        label='Add a trait'
                        size='small'
                        onClick={() =>
                            insert(characterForm, 'personalityTraits', {
                                value: { description: '' },
                            })
                        }
                    />
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
                    {/* TODO: Turn this section into its own component */}
                    <FieldArray name='npcRelationships' validate={[
                        minLength(2, 'Characters must have at least two relationships')
                    ]}>
                        {(fieldArray) =>
                            fieldArray.items.value.map((item, index) => (
                                <div key={item} className='py-2 md:px-2' style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                    <Field
                                        name={`npcRelationships.${index}.npcId`}
                                        validate={[required('Please select an NPC for this relationship')]}
                                    >
                                        {(field, props) => (
                                            <label>
                                                NPC{' '}
                                                <select {...props} required>
                                                    {npcs
                                                        .filter((npc) => npc.id !== undefined)
                                                        .map((npc, index) => (
                                                            <option
                                                                key={index}
                                                                value={npc.id!}
                                                                selected={field.value.value === npc.id!}
                                                            >
                                                                {npc.name}
                                                            </option>
                                                        ))}
                                                </select>
                                            </label>
                                        )}
                                    </Field>
                                    <Field
                                        name={`npcRelationships.${index}.valence`}
                                        validate={[required('Please select a type for this relationship')]}
                                    >
                                        {(field, props) => (
                                            <label>
                                                Relationship Type{' '}
                                                <select {...props} required>
                                                    {getEnumKeys(RelationshipValence).map((valence, index) => (
                                                        <option
                                                            key={index}
                                                            value={RelationshipValence[valence]}
                                                            selected={
                                                                field.value.value === RelationshipValence[valence]
                                                            }
                                                        >
                                                            {startCase(valence.toLocaleLowerCase())}
                                                        </option>
                                                    ))}
                                                </select>
                                            </label>
                                        )}
                                    </Field>
                                    <Field
                                        name={`npcRelationships.${index}.description`}
                                        validate={[
                                            maxLength(
                                                1000,
                                                'Relationship descriptions must contain at most 1000 characters'
                                            ),
                                            required('Please enter a description for this relationship'),
                                        ]}
                                    >
                                        {(field, props) => (
                                            <TextAreaInput
                                                {...props}
                                                label='Relationship Description'
                                                value={field.value}
                                                error={field.error}
                                                required
                                            />
                                        )}
                                    </Field>
                                    <Button
                                        label='Remove this relationship'
                                        size='small'
                                        onClick={() =>
                                            remove(characterForm, 'npcRelationships', {
                                                at: index,
                                            })
                                        }
                                    />
                                </div>
                            ))
                        }
                    </FieldArray>
                    <Button
                        primary
                        label='Add a relationship'
                        size='small'
                        onClick={() =>
                            insert(characterForm, 'npcRelationships', {
                                value: {
                                    npcId: -1,
                                    valence: RelationshipValence.NEUTRAL,
                                    description: ''
                                },
                            })
                        }
                    />
                </div>
                <h2>Backstory</h2>
                <Field
                    name='backstoryText'
                    validate={[maxLength(1000000, 'Backstories must contain at most 1,000,000 characters')]}
                >
                    {(field, props) => (
                        <TextAreaInput
                            {...props}
                            rows={10}
                            cols={200}
                            style={{ resize: 'both' }}
                            value={field.value}
                            error={field.error}
                        />
                    )}
                </Field>
                <FormFooter of={characterForm} />
            </Form>
        </>
    );
}
