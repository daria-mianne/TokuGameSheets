import { SimpleTextField } from '../fields/SimpleTextField';

export default function AbilityCreator() {
    // FIXME: if the current user isn't an admin, render an error page instead (requires https://github.com/daria-mianne/TokuGameSheets/issues/5 to be done)

    return (
        <>
            <h1>Ability Creator</h1>
            <form id='AbilityCreation'>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <label>
                        Ability Name (max length 100 chars):
                        <br />
                        <input id='AbilityName' type='text' maxLength={100} required={true} />
                    </label>
                    <br />
                    <label>
                        Ability Type:
                        <br />
                        <select id='AbilityType' required={true}>
                            <option value='armory'>Armor / Weapon</option>
                            <option value='iconic'>Iconic</option>
                            <option value='personal'>Personal</option>
                            <option value='team'>Team</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Ability Description (max length 10,000 chars):
                        <br />
                        <SimpleTextField
                            id='AbilityDescription'
                            rows={4}
                            columns={50}
                            maxLength={10000}
                            required={true}
                            resizable='both'
                            onSave={() => {} /*FIXME*/}
                        />
                    </label>
                    <br />
                    <div>
                        Ability Mechanics:
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;This section to come in a later update.
                    </div>
                    <input type='submit' value='Submit' />
                </div>
            </form>
        </>
    );
}
