import { useEffect, useState } from 'preact/hooks';
import ErrorBanner from '@components/forms/ErrorBanner';
import { Form, FormControl } from '@shelacek/formica';
import { AccountCreationData } from './types';
import { FormControlValidationProps } from '@utils/externalTypes';
import { useLocation } from 'preact-iso';
import { checkInviteToken } from '@hooks/api/checkTokenValidity';
import { signup } from '@hooks/api/users';

const containsLowercase = '(?=.*[a-z])';
const containsUppercase = '(?=.*[A-Z])';
const containsNumber = '(?=.*[0-9])';
const containsSymbol = '(?=.*[@!#$%^&*\\(\\)_+=])';
const passwordPattern = containsLowercase + containsUppercase + containsNumber + containsSymbol;

const Loading = () => <p>Loading...</p>;

export default function AccountCreator() {
    const { query } = useLocation();
    const inviteToken = query.token;
    const [loading, setLoading] = useState(true);
    const [validToken, setValidToken] = useState(false);
    const [forAdmin, setForAdmin] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const [formData, setFormData] = useState<AccountCreationData>({
        username: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        void checkInviteToken(inviteToken).then((checkResult) => {
            if (checkResult.valid) {
                setValidToken(true);
                setForAdmin(checkResult.forAdmin);
            } else {
                setValidToken(false);
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (!validToken) {
        return (<>
            <h1>Invalid Token</h1>
            <p>Your invitation token is invalid.</p>
        </>);
    }

    if (submitted) {
        if (successfulCreation) {
            return <p>Your account has been created successfully!</p>;
        }
        return <p>Failed to create your account! Please try again.</p>;
    }

    const handleSubmit = (event: Event) => {
        if ((event.target as HTMLFormElement)?.checkValidity()) {
            setLoading(true);
            setSubmitted(true);
            void signup(inviteToken, formData.username, formData.password, formData.displayName, formData.recoveryEmail, forAdmin)
                .then((signupResult) => {
                    setSuccessfulCreation(signupResult.id !== null);
                    setLoading(false);
                });
        }
    };

    // FIXME: Make form check for valid token in URL query param, associate all submitted data with that token, and invalidate the token if the account creation is successful
    //        (requires https://github.com/daria-mianne/TokuGameSheets/issues/4 and part of https://github.com/daria-mianne/TokuGameSheets/issues/12 to be done)

    return (
        <>
            <h1>Account Creator</h1>
            <Form class='validated' value={formData} onChange={setFormData} onSubmit={handleSubmit}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <h2>Required Fields</h2>
                    <FormControl name='username' class='form-input'>
                        {({ touched, validity }: FormControlValidationProps) => (
                            <>
                                <label>
                                    Username (alphanumeric only, length between 5 and 100 chars){' '}
                                    <input
                                        name='username'
                                        type='text'
                                        pattern='[a-zA-Z0-9]+'
                                        minLength={5}
                                        maxLength={100}
                                        required
                                    />
                                </label>
                                {touched && validity.tooShort && (
                                    <ErrorBanner message='Username must be at least 5 characters long' />
                                )}
                                {touched && validity.patternMismatch && (
                                    <ErrorBanner message='Username must be alphanumeric only' />
                                )}
                            </>
                        )}
                    </FormControl>
                    <br />
                    <h3>Password</h3>
                    Requirements:
                    <ul>
                        <li>Must be 8 to 128 characters</li>
                        <li>Must contain an uppercase letter</li>
                        <li>Must contain a lowercase letter</li>
                        <li>Must contain a number</li>
                        <li>Must contain at least one symbol from this list: !@#$%^&*()=_+</li>
                    </ul>
                    <FormControl name='password' class='form-input'>
                        {({ touched, validity }: FormControlValidationProps) => (
                            <>
                                <label>
                                    Password{' '}
                                    <input
                                        name='password'
                                        type='password'
                                        minlength={8}
                                        maxlength={128}
                                        pattern={passwordPattern}
                                    />
                                </label>
                                {touched && validity.tooShort && <ErrorBanner message='Password is too short!' />}
                                {touched && validity.patternMismatch && (
                                    <ErrorBanner message='Password does not contain required character types!' />
                                )}
                            </>
                        )}
                    </FormControl>
                    <FormControl name='confirmPassword' class='form-input'>
                        {({ touched }: FormControlValidationProps) => (
                            <>
                                <label>
                                    Confirm password{' '}
                                    <input name='confirmPassword' type='password' minLength={8} maxlength={128} />
                                </label>
                                <div style={{ color: 'red' }}>
                                    {touched && formData.confirmPassword !== formData.password && (
                                        <ErrorBanner message='Passwords do not match!' />
                                    )}
                                </div>
                            </>
                        )}
                    </FormControl>
                    <br />
                    <h2>Optional Fields</h2>
                    <FormControl name='displayName' class='form-input'>
                        {({ touched, validity }: FormControlValidationProps) => (
                            <>
                                <label>
                                    Display Name (alphanumeric only, max length 100 chars){' '}
                                    <input
                                        name='displayName'
                                        type='text'
                                        pattern='[a-zA-Z0-9]+'
                                        maxLength={100}
                                        required={false}
                                    />
                                </label>
                                {touched && formData.displayName !== '' && validity.tooShort && (
                                    <ErrorBanner message='Display name must be at least 5 characters long' />
                                )}
                                {touched && formData.displayName !== '' && validity.patternMismatch && (
                                    <ErrorBanner message='Display name must be alphanumeric only' />
                                )}
                            </>
                        )}
                    </FormControl>
                    <h3>Email</h3>
                    <p>
                        We only use your email address to assist with recovering your account and will never use it for
                        any other purpose.
                    </p>
                    <FormControl name='recoveryEmail' class='form-input'>
                        {({ touched, validity }: FormControlValidationProps) => (
                            <>
                                <label>
                                    Recovery email address (max length 500 characters){' '}
                                    <input
                                        name='recoveryEmail'
                                        type='email'
                                        pattern='.+@.+\..+'
                                        maxLength={500}
                                        required={false}
                                    />
                                </label>
                                {touched && formData.recoveryEmail !== '' && validity.patternMismatch && (
                                    <ErrorBanner message='Invalid email address!' />
                                )}
                            </>
                        )}
                    </FormControl>
                    <FormControl name='confirmEmail' class='form-input'>
                        {({ touched }: FormControlValidationProps) => (
                            <>
                                <label>
                                    Confirm recovery email address{' '}
                                    <input
                                        name='confirmEmail'
                                        type='email'
                                        maxLength={500}
                                        required={!!formData.recoveryEmail}
                                    />
                                </label>
                                {touched && formData.confirmEmail !== formData.recoveryEmail && (
                                    <ErrorBanner message='Emails do not match!' />
                                )}
                            </>
                        )}
                    </FormControl>
                    <input type='submit' value='Submit' />
                </div>
            </Form>
        </>
    );
}
