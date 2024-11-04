import { useEffect, useState } from 'preact/hooks';
import { debounce } from 'lodash';
import { PasswordProps } from './types';
import ErrorBanner from '../ErrorBanner';

// Require at least one lower-case, at least one upper-case, at least one number, and at least one symbol
const PASSWORD_REQS = /(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])/;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 128;

export function PasswordField(props: PasswordProps) {
    const [mainValue, setMainValue] = useState('');
    const [confirmValue, setConfirmValue] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [validLength, setValidLength] = useState(false);
    const [meetsReqs, setMeetsReqs] = useState(false);
    const debouncedSetMainValue = debounce(setMainValue, 100);
    const debouncedSetConfirmValue = debounce(setConfirmValue, 100);

    useEffect(() => {
        setPasswordsMatch(mainValue === confirmValue);
    }, [mainValue, confirmValue]);

    useEffect(() => {
        setValidLength(MIN_PASSWORD_LENGTH <= mainValue.length && mainValue.length <= MAX_PASSWORD_LENGTH);
        setMeetsReqs(!!mainValue.match(PASSWORD_REQS)?.length);
    }, [mainValue]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: props.flexDirection || 'row',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <label>
                    Password:
                    <br />
                    <input type='password' required={props.required} onKeyUp={(e) => debouncedSetMainValue(e.target?.value)} />
                </label>
                {(() => {
                    if (!passwordsMatch) {
                        return <ErrorBanner message='Passwords do not match!' />;
                    } else if (mainValue.length !== 0 && mainValue.length < MIN_PASSWORD_LENGTH) {
                        return <ErrorBanner message='Password is too short!' />;
                    } else if (mainValue.length > MAX_PASSWORD_LENGTH) {
                        return <ErrorBanner message='Password is too long!' />;
                    } else if (mainValue.length !== 0 && !meetsReqs) {
                        return <ErrorBanner message='Password does not meet requirements!' />;
                    }
                })()}
                <div>
                    Password requirements:
                    <br />
                    - At least 1 lowercase letter
                    <br />
                    - At least 1 uppercase letter
                    <br />
                    - At least 1 number
                    <br />
                    - At least 1 symbol
                    <br />- Length between 8 and 128 characters
                </div>
            </div>
            <label>
                Confirm Password:
                <br />
                <input type='password' required={props.required} onKeyUp={(e) => debouncedSetConfirmValue(e.target?.value)} />
            </label>
        </div>
    );
}
