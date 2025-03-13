// import { SimpleTextField } from '../fields/SimpleTextField';
import { Form, FormGroup } from '@shelacek/formica';
import { useState } from 'preact/hooks';
import { AbilityDesign, AbilityType } from './types';

export default function AbilityDesigner() {
    const [formData, setFormData] = useState<AbilityDesign>({
        name: '',
        type: AbilityType.ARMORY,
        description: '',
        mechanics: null,
    });

    const handleSubmit = (event: Event) => {
        if ((event.target as HTMLFormElement)?.checkValidity()) {
            // TODO: API call
        }
        console.log('Ability Designer Form Data', formData); // TODO: Remove this
    };

    // TODO: More advanced permissioning than just "is admin? yes/no"
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
                <FormGroup>
                    <h2>Ability Mechanics</h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;This section to come in a later update.
                </FormGroup>
                <br />
                <br />
                <button type='submit'>Submit form</button>
            </Form>
        </>
    );
}
