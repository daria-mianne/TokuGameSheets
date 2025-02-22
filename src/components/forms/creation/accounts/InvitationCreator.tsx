import { Form } from '@shelacek/formica';
import { useState } from 'preact/hooks';
import { InvitationData } from './types';

export default function InvitationCreator() {
    const [formData, setFormData] = useState<InvitationData>({
        isAdmin: false,
        recipient: '',
    });
    // FIXME: If the current user isn't an admin, render an error page instead (requires https://github.com/daria-mianne/TokuGameSheets/issues/5 to be done)

    const handleSubmit = (event: Event) => {
        if ((event.target as HTMLFormElement)?.checkValidity()) {
            // TODO: API call
        }
        console.log('Invitation Form Data', formData); // TODO: Remove this
    };

    return (
        <>
            <h1>Invitation Creator</h1>
            <Form class='validated' value={formData} onChange={setFormData} onSubmit={handleSubmit}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <label>
                        Make user an admin? <input type='checkbox' name='isAdmin'></input>
                    </label>
                    <br />
                    <label>
                        Recipient email <input type='email' name='recipient' maxLength={500} required />
                    </label>
                    <input type='submit' value='Submit' />
                </div>
            </Form>
        </>
    );
}
