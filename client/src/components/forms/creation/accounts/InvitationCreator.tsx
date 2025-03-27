import { createInviteToken } from '@hooks/api/tokens';
import { useMemoryOnlyDataStore } from '@datastore/memoryOnlyData';
import { email, required, SubmitHandler, useForm } from '@modular-forms/preact';
import { Invitation } from '@models/invitation';
import { TextInput } from '@components/forms/inputs/TextInput';
import { FormFooter } from '@components/forms/inputs/FormFooter';

export default function InvitationCreator() {
    const [inviteForm, { Form, Field }] = useForm<Invitation>();
    const { currentUser } = useMemoryOnlyDataStore();

    const handleSubmit: SubmitHandler<Invitation> = async (values, event) => {
        if ((event.target as HTMLFormElement)?.checkValidity()) {
            return createInviteToken(currentUser!.id, values.recipient, values.forAdmin);
        }
    };

    const getInviteLink = (guid: string) => {
        const href = `https://tokusheets.rec97.space/signup?token=${guid}`;
        return <a href={href}>{href}</a>;
    };

    return (
        <>
            <h1>Invitation Creator</h1>
            <Form onSubmit={handleSubmit}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Field name='forAdmin' type='boolean'>
                        {(_, props) => (
                            <label>
                                Should the invited user be an admin? <input {...props} type='checkbox' />
                            </label>
                        )}
                    </Field>
                    <Field
                        name='recipient'
                        validate={[
                            required('Please enter the recipient email address'),
                            email('The email address is improperly formatted'),
                        ]}
                    >
                        {(field, props) => (
                            <TextInput
                                {...props}
                                type='email'
                                label='Recipient email'
                                value={field.value}
                                error={field.error}
                                required
                            />
                        )}
                    </Field>
                    <FormFooter of={inviteForm} />
                </div>
            </Form>
            {inviteForm.response.value.message && (
                <p>
                    Created invitation! While we work on adding the ability to send emails from the server, please send
                    this link to your desired recipient: {getInviteLink(inviteForm.response.value.message)}
                </p>
            )}
        </>
    );
}
