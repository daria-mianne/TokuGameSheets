import { useState } from 'preact/hooks';
import { LoginData } from './types';
import { useSessionStore } from '@datastore/sessionData';
import { login } from '@hooks/api/users';
import { ErrorBanner } from '@components/banners/ErrorBanner';
import { useLocation } from 'preact-iso';
import { useMemoryOnlyDataStore } from '@datastore/memoryOnlyData';
import { maxLength, minLength, pattern, required, SubmitHandler, useForm } from '@modular-forms/preact';
import { TextInput } from '../inputs/TextInput';
import { Button } from '@components/base';

export default function LoginForm() {
    const [, { Form, Field }] = useForm<LoginData>();
    const [loginFailed, setLoginFailed] = useState(false);
    const { setToken } = useSessionStore();
    const { route, query } = useLocation();
    const { setCurrentUser } = useMemoryOnlyDataStore();

    const handleSubmit: SubmitHandler<LoginData> = async (values, event) => {
        if ((event.target as HTMLFormElement)?.checkValidity()) {
            login(values.username, values.password).then((loginResult) => {
                if (loginResult.token && loginResult.user) {
                    setToken(loginResult.token);
                    setCurrentUser(loginResult.user);
                    setLoginFailed(false);
                    route(decodeURI(query.redirectUri));
                } else {
                    setLoginFailed(true);
                }
            });
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Field
                    name='username'
                    validate={[
                        required('Please enter a username'),
                        minLength(5, 'Usernames must contain at least 5 characters'),
                        maxLength(100, 'Usernames must contain at most 100 characters'),
                        pattern(/^[a-zA-Z\d]+$/, 'Usernames must contain only alphanumeric characters'),
                    ]}
                >
                    {(field, props) => (
                        <TextInput
                            {...props}
                            type='text'
                            label='Username'
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
                <Button primary type='submit' label='Submit' />
            </Form>
            {loginFailed && <ErrorBanner id='loginfailure' message='Login failed' />}
            <p>If you do not yet have an account, you must use an invitation link to create one.</p>
        </>
    );
}
