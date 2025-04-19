import { useEffect, useState } from 'preact/hooks';
import { AccountCreationData } from './types';
import { useLocation } from 'preact-iso';
import { isInviteTokenValid } from '@hooks/api/tokens';
import { signup } from '@hooks/api/users';
import { Loading } from '@components/Loading';
import { Button } from '@components/base';
import { custom, email, maxLength, minLength, pattern, required, SubmitHandler, useForm } from '@modular-forms/preact';
import { TextInput } from '@components/forms/inputs/TextInput';

const containsLowercase = /(?=.*[a-z])/;
const containsUppercase = /(?=.*[A-Z])/;
const containsNumber = /(?=.*[0-9])/;
const containsNonAlphanumeric = /(?=.*[^a-zA-Z0-9])/;

export default function AccountCreator() {
    const { query } = useLocation();
    const inviteToken = query.token;
    const [loading, setLoading] = useState(true);
    const [validToken, setValidToken] = useState(false);
    const [forAdmin, setForAdmin] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [successfulCreation] = useState(false);
    const [accountForm, { Form, Field }] = useForm<AccountCreationData>();

    useEffect(() => {
        void isInviteTokenValid(inviteToken).then((checkResult) => {
            setValidToken(checkResult.valid);
            if (checkResult.valid) {
                setForAdmin(checkResult.forAdmin);
            }
            setLoading(false);
        });
    }, [inviteToken]);

    if (loading) {
        return <Loading />;
    }

    if (!validToken) {
        return (
            <>
                <h1>Invalid Token</h1>
                <p>Your invitation token is invalid.</p>
            </>
        );
    }

    if (submitted && successfulCreation) {
        return <p>Your account has been created successfully!</p>;
    }

    const handleSubmit: SubmitHandler<AccountCreationData> = async (values, event) => {
        if (values.password !== values.confirmPassword) {
            // not true validation yet, so return early
            setLoading(false);
            setSubmitted(false);
            return;
        }

        if ((event.target as HTMLFormElement)?.checkValidity()) {
            setLoading(true);
            setSubmitted(true);
            return signup(
                inviteToken,
                values.username,
                values.password,
                values.displayName,
                values.recoveryEmail,
                forAdmin
            ).then((signupResult) => {
                setLoading(false);
                return signupResult;
            });
        }
    };

    return (
        <>
            <h1>Account Creator</h1>
            <Form class='validated' onSubmit={handleSubmit}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <h2>Required Fields</h2>
                    <Field
                        name='username'
                        validate={[
                            required('Please enter a username'),
                            minLength(5, 'Your username must contain at least 5 characters'),
                            maxLength(100, 'Your username must contain at most 100 characters'),
                            pattern(/^[a-zA-Z\d]+$/, 'Your username must only contain alphanumeric characters'),
                        ]}
                    >
                        {(field, props) => (
                            <TextInput
                                {...props}
                                type='text'
                                label='Username (alphanumeric only, no spaces, length between 5 and 100 chars)'
                                value={field.value}
                                error={field.error}
                                required
                            />
                        )}
                    </Field>
                    <Field
                        name='password'
                        validate={[
                            required('Please enter a password'),
                            minLength(8, 'Your password must contain at least 8 characters'),
                            maxLength(128, 'Your password must contain at most 128 characters'),
                            pattern(containsLowercase, 'Your password must contain a lowercase letter'),
                            pattern(containsUppercase, 'Your password must contain an uppercase letter'),
                            pattern(containsNumber, 'Your password must contain a digit'),
                            pattern(containsNonAlphanumeric, 'Your password must contain a non-alphanumeric character'),
                        ]}
                    >
                        {(field, props) => (
                            <TextInput
                                {...props}
                                type='password'
                                label='Password'
                                value={field.value}
                                error={field.error}
                                required
                            />
                        )}
                    </Field>
                    <Field
                        name='confirmPassword'
                        validate={[
                            custom(
                                (value) =>
                                    value ===
                                    accountForm.internal.fields.password?.value
                                        .value /* there's GOTTA be a better way than this */,
                                'Your passwords must match'
                            ),
                        ]}
                    >
                        {(field, props) => (
                            <TextInput
                                {...props}
                                type='password'
                                label='Confirm Password'
                                value={field.value}
                                error={field.error}
                                required
                            />
                        )}
                    </Field>
                    <h2>Optional Fields</h2>
                    <Field
                        name='displayName'
                        validate={[
                            pattern(
                                /^[a-zA-Z0-9 ]+$/,
                                'Your display name must only contain alphanumeric characters and spaces'
                            ),
                            pattern(/^[a-zA-Z0-9]/, 'Your display name must not start with whitespace'),
                            pattern(/[a-zA-Z0-9]$/, 'Your display name must not end with whitespace'),
                            maxLength(100, 'Your display name must contain at most 100 characters'),
                        ]}
                    >
                        {(field, props) => (
                            <TextInput
                                {...props}
                                type='text'
                                label='Display Name'
                                value={field.value}
                                error={field.error}
                            />
                        )}
                    </Field>
                    <Field
                        name='recoveryEmail'
                        validate={[
                            email('The email address is improperly formatted'),
                            maxLength(500, 'Your email address must contain at most 500 characters'),
                        ]}
                    >
                        {(field, props) => (
                            <TextInput
                                {...props}
                                type='email'
                                label='Recovery Email - We will only ever use your email address to assist with recovering your account'
                                value={field.value}
                                error={field.error}
                            />
                        )}
                    </Field>
                    <Field
                        name='confirmEmail'
                        validate={[
                            custom(
                                (value) =>
                                    value ===
                                    accountForm.internal.fields.recoveryEmail?.value
                                        .value /* there's GOTTA be a better way than this */,
                                'Your emails must match'
                            ),
                        ]}
                    >
                        {(field, props) => (
                            <TextInput
                                {...props}
                                type='email'
                                label='Confirm Email'
                                value={field.value}
                                error={field.error}
                            />
                        )}
                    </Field>
                    <Button primary type='submit' label='Submit' />
                </div>
            </Form>
        </>
    );
}
