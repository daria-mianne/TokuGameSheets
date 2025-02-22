// import { SimpleTextField } from '../fields/SimpleTextField';
import { Form, FormGroup } from '@shelacek/formica';
import { useState } from 'preact/hooks';
import { AbilityDesign, AbilityType } from './types';

export default function AbilityDesigner() {
    // FIXME: if the current user isn't an admin, render an error page instead (requires https://github.com/daria-mianne/TokuGameSheets/issues/5 to be done)

    const [formData, setFormData] = useState<AbilityDesign>({
        name: '',
        type: AbilityType.ARMORY,
        description: '',
        mechanics: null
    });

    const handleSubmit = (event: Event) => {
        if ((event.target as HTMLFormElement)?.checkValidity()) {
            // TODO: API call
        }
    }

    return (
        <>
            <h1>Ability Designer</h1>
            <Form class="validated" value={formData} onChange={setFormData} onSubmit={handleSubmit}>
                <label>
                    Ability Name (max length 100 chars):
                    <br />
                    <input name='name' type='text' maxLength={100} required={true} />
                </label>
                <br />
                <label>
                    Ability Type:
                    <br />
                    <select id='type' required={true}>
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
                    <textarea name='description' rows={4} cols={50} maxLength={10000} required={true} style={{resize: 'both'}} />
                </label>
                <br />
                <FormGroup>
                    <h2>Ability Mechanics</h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;This section to come in a later update.
                </FormGroup>
                <br />
                <br />
                <button type="submit">Submit form</button>
            </Form>
        </>
    );
}
