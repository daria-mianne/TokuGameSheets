import { Form } from '@shelacek/formica';
import { useState } from 'preact/hooks';
import { InvitationData } from './types';
import { createInviteToken } from '@hooks/api/tokens';
import { useMemoryOnlyDataStore } from '@datastore/memoryOnlyData';

export default function InvitationCreator() {
    const [inviteLink, setInviteLink] = useState<string | null>(null);
    const [formData, setFormData] = useState<InvitationData>({
        isAdmin: false,
        recipient: '',
    });
    const { currentUser } = useMemoryOnlyDataStore();

    const handleSubmit = (event: Event) => {
        if ((event.target as HTMLFormElement)?.checkValidity()) {
            void createInviteToken(currentUser!.id, formData.recipient, formData.isAdmin).then((token) => {
                setInviteLink(`https://tokusheets.rec97.space/signup?token=${token}`);
            });
        }
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
            {inviteLink && (
                <p>
                    Created invitation! While we work on adding the ability to send emails from the server, please send
                    this link to your desired recipient: <a href={inviteLink}>{inviteLink}</a>
                </p>
            )}
        </>
    );
}
