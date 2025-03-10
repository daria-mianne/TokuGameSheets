import { Form } from '@shelacek/formica';
import { useState } from 'preact/hooks';
import { LoginData } from './types';
import { useSessionStore } from '@datastore/sessionData';
import { login } from '@hooks/api/users';
import ErrorBanner from '@components/forms/ErrorBanner';
import { useLocation } from 'preact-iso';

export default function LoginForm() {
    const [formData, setFormData] = useState<LoginData>({
        username: '',
        password: '',
    });
    const [loginFailed, setLoginFailed] = useState(false);
    const { setToken } = useSessionStore();
    const { route, query } = useLocation();

    const handleSubmit = (event: Event) => {
        if ((event.target as HTMLFormElement)?.checkValidity()) {
            login(formData.username, formData.password).then((loginResult) => {
                if (loginResult.token) {
                    setToken(loginResult.token);
                    window.currentUser = loginResult.user;
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
            <Form class='validated' value={formData} onChange={setFormData} onSubmit={handleSubmit}>
                <label>
                    Username:
                    <br />
                    <input name='username' type='text' required />
                </label>
                <br />
                <label>
                    Password:
                    <br />
                    <input name='password' type='password' required />
                </label>
                <br />
                <button type='submit'>Log in</button>
            </Form>
            {loginFailed && <ErrorBanner message='Login failed' />}
            <p>If you do not yet have an account, you must use an invitation link to create one.</p>
        </>
    );
}
