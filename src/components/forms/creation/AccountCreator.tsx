import { Dispatch, StateUpdater, useState } from 'preact/hooks';
import { PasswordField } from '../fields/PasswordField';

export default function AccountCreator() {
    const [emailsMatch, setEmailsMatch] = useState(true);
    const checkSame = (setFunc: Dispatch<StateUpdater<boolean>>, a?: string, b?: string) => setFunc(a === b);
    const getElementText = (id: string) => document.getElementById(id)?.innerText;

    // FIXME: Make form check for valid token in URL query param, associate all submitted data with that token, and invalidate the token if the account creation is successful
    //        (requires https://github.com/daria-mianne/TokuGameSheets/issues/4 and part of https://github.com/daria-mianne/TokuGameSheets/issues/12 to be done)

    return (
        <>
            <h1>Account Creator</h1>
            <form id='AccountCreation'>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <h2>Required Fields</h2>
                    <label>
                        Username (alphanumeric only, max length 100 chars):&nbsp;
                        <input id='username' type='text' pattern='[a-zA-Z0-9]+' maxLength={100} required={true} />
                    </label>
                    <PasswordField required={true} onSave={() => {} /*FIXME*/} />
                    <h2>Optional Fields</h2>
                    <label>
                        Display Name (max length 100 chars):&nbsp;
                        <input id='displayName' type='text' maxLength={100} required={false} />
                    </label>
                    <label>
                        Recovery email address (max length 500 chars):&nbsp;
                        {emailsMatch ? '' : 'EMAILS MUST MATCH'}
                        <input
                            id='emailMain'
                            type='text'
                            maxLength={500}
                            required={false}
                            onInput={() => checkSame(setEmailsMatch, getElementText('emailMain'), getElementText('emailConfirm'))}
                        />
                    </label>
                    <label>
                        Confirm recovery email address:&nbsp;
                        {emailsMatch ? '' : 'EMAILS MUST MATCH'}
                        <input
                            id='emailConfirm'
                            type='text'
                            maxLength={500}
                            required={getElementText('emailMain') !== ''}
                            onInput={() => checkSame(setEmailsMatch, getElementText('emailMain'), getElementText('emailConfirm'))}
                        />
                    </label>
                    <input type='submit' value='Submit' />
                </div>
            </form>
        </>
    );
}
