import { useState } from 'preact/hooks';
import { Ability, AbilityType } from '@models/ability';
import { createAbility } from '@hooks/api/abilities';
import { maxLength, required, SubmitHandler, useForm } from '@modular-forms/preact';
import { TextInput } from '@components/forms/inputs/TextInput';
import { TextAreaInput } from '@components/forms/inputs/TextAreaInput';
import { FormFooter } from '@components/forms/inputs/FormFooter';
import { SelectInput } from '@components/forms/inputs/SelectInput';

export default function AbilityDesigner() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const [abilityForm, { Form, Field }] = useForm<Ability>();

    const handleSubmit: SubmitHandler<Ability> = (values, event) => {
        setSubmitted(true);
        if ((event.target as HTMLFormElement)?.checkValidity()) {
            setLoading(true);
            void createAbility(values).then((id) => {
                setLoading(false);
                setSuccessfulCreation(!!id);
            });
        } else {
            setLoading(false);
            setSuccessfulCreation(false);
        }
    };

    return (
        <>
            <h1>Ability Designer</h1>
            <Form onSubmit={handleSubmit}>
                <Field
                    name='name'
                    validate={[
                        maxLength(100, 'Ability names must contain at most 100 characters'),
                        required('Please enter a name for this ability'),
                    ]}
                >
                    {(field, props) => (
                        <TextInput
                            {...props}
                            type='text'
                            label='Name'
                            value={field.value}
                            error={field.error}
                            required
                        />
                    )}
                </Field>
                <Field name='adminOnly' type='boolean'>
                    {(_, props) => (
                        <label>
                            Should this ability only be usable by admins? <input {...props} type='checkbox' />
                            <br />
                        </label>
                    )}
                </Field>
                <Field name='type' validate={[required('Please select an ability type')]}>
                    {(field, props) => (
                        <SelectInput {...props} label='Ability Type' value={field.value} error={field.error} required>
                            <option
                                key={0}
                                value={AbilityType.ARMORY}
                                selected={field.value.value === AbilityType.ARMORY}
                            >
                                Armor / Weapon
                            </option>
                            <option
                                key={1}
                                value={AbilityType.ICONIC}
                                selected={field.value.value === AbilityType.ICONIC}
                            >
                                Iconic
                            </option>
                            <option
                                key={2}
                                value={AbilityType.PERSONAL}
                                selected={field.value.value === AbilityType.PERSONAL}
                            >
                                Personal
                            </option>
                            <option key={3} value={AbilityType.TEAM} selected={field.value.value === AbilityType.TEAM}>
                                Team
                            </option>
                        </SelectInput>
                    )}
                </Field>
                <Field
                    name='description'
                    validate={[
                        maxLength(10000, 'Ability descriptions must contain at most 10,000 characters'),
                        required('Please enter a description for this ability'),
                    ]}
                >
                    {(field, props) => (
                        <TextAreaInput
                            {...props}
                            label='Description'
                            rows={4} // TODO: figure out why intellisense thinks the rows property doesn't exist
                            cols={50}
                            style={{ resize: 'both' }}
                            value={field.value}
                            error={field.error}
                            required
                        />
                    )}
                </Field>
                <h2>Ability Mechanics</h2>
                &nbsp;&nbsp;&nbsp;&nbsp;This section to come in a later update.
                <FormFooter of={abilityForm} />
            </Form>
            {submitted && loading && <p>Creating your ability...</p>}
            {submitted && !loading && successfulCreation && <p>Successfully created your ability!</p>}
            {submitted && !loading && !successfulCreation && <p>Failed to create your ability. Please try again.</p>}
        </>
    );
}
