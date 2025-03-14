// import { SimpleTextField } from '../fields/SimpleTextField';
import { Form, FormGroup } from '@shelacek/formica';
import { useState } from 'preact/hooks';
import { Ability, AbilityType } from '@models/ability';
import { createAbility } from '@hooks/api/abilities';

export default function AbilityDesigner() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const [formData, setFormData] = useState<Ability>({
        name: '',
        adminOnly: false,
        type: AbilityType.ARMORY,
        description: '',
        mechanics: null,
    });

    const handleSubmit = (event: Event) => {
        setSubmitted(true);
        if ((event.target as HTMLFormElement)?.checkValidity()) {
            setLoading(true);
            void createAbility(formData).then((id) => {
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
            <Form class='validated' value={formData} onChange={setFormData} onSubmit={handleSubmit}>
                <label>
                    Ability Name (max length 100 chars):
                    <br />
                    <input name='name' type='text' maxLength={100} required />
                </label>
                <br />
                <br />
                <label>
                    Should only admins be able to see this ability?{' '}
                    <input name='adminOnly' type='checkbox' />
                </label>
                <br />
                <br />
                <label>
                    Ability Type:
                    <br />
                    <select name='type' required>
                        <option value={AbilityType.ARMORY}>Armor / Weapon</option>
                        <option value={AbilityType.ICONIC}>Iconic</option>
                        <option value={AbilityType.PERSONAL}>Personal</option>
                        <option value={AbilityType.TEAM}>Team</option>
                    </select>
                </label>
                <br />
                <br />
                <label>
                    Ability Description (max length 10,000 chars):
                    <br />
                    <textarea
                        name='description'
                        rows={4}
                        cols={50}
                        maxLength={10000}
                        required
                        style={{ resize: 'both' }}
                    />
                </label>
                <br />
                <br />
                <FormGroup>
                    <h2>Ability Mechanics</h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;This section to come in a later update.
                </FormGroup>
                <br />
                <br />
                <button type='submit'>Submit form</button>
            </Form>
            {submitted && loading && <p>Creating your ability...</p>}
            {submitted && !loading && successfulCreation && <p>Successfully created your ability!</p>}
            {submitted && !loading && !successfulCreation && <p>Failed to create your ability. Please try again.</p>}
        </>
    );
}
