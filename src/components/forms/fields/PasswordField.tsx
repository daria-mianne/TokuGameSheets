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
    const [meetsReqs, setMeetsReqs] = useState(false);
    const debouncedSetMainValue = debounce(setMainValue, 100);
    const debouncedSetConfirmValue = debounce(setConfirmValue, 100);

    useEffect(() => {
        setPasswordsMatch(mainValue === confirmValue);

        setMeetsReqs(MIN_PASSWORD_LENGTH <= mainValue.length && mainValue.length <= MAX_PASSWORD_LENGTH && !!mainValue.match(PASSWORD_REQS)?.length);
    }, [mainValue, confirmValue]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: props.flexDirection || 'horizontal',
            }}
        >
            <label>
                Password:&nbsp;
                <input type='password' required={props.required} onChange={debouncedSetMainValue} />
            </label>
            {passwordsMatch ? '' : <ErrorBanner message='Passwords do not match!' />}
            {meetsReqs ? '' : <ErrorBanner message='Password does not meet requirements!' />}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'vertical',
                }}
            >
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
            <label>
                Confirm Password:&nbsp;
                <input type='password' required={props.required} onChange={debouncedSetConfirmValue} />
            </label>
        </div>
    );
}
