export function InvitationCreator() {
    // FIXME: If the user isn't an admin, render an error page instead (requires https://github.com/daria-mianne/TokuGameSheets/issues/5 to be done)

    return (
        <>
            <h1>Invitation Creator</h1>
            <form id='InvitationCreation'>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <label>
                        Make user an admin?
                        <input type='checkbox' id='isAdmin'></input>
                    </label>
                    <label>
                        Email to send invitation to (max length 500 chars):&nbsp;
                        <input type='text' id='recipient' maxLength={500} required={true} />
                    </label>
                    <input type='submit' value='Submit' />
                </div>
            </form>
        </>
    );
}
