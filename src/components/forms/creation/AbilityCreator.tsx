export function AbilityCreator() {
    // FIXME: if the current user isn't an admin, render an error page instead (requires https://github.com/daria-mianne/TokuGameSheets/issues/5 to be done)

    return (<>
        <h1>Ability Creator</h1>
        <form id="AbilityCreation">
            <div style={{
                display: "flex",
                flexDirection: "column",
            }}>
                <label>
                    Ability Name (max length 100 chars):
                    <input id="AbilityName" type="text" maxLength={100} required={true} />
                </label>
                <label>
                    Ability Type:
                    <select id="AbilityType" required={true}>
                        <option value="armory">Armor / Weapon</option>
                        <option value="iconic">Iconic</option>
                        <option value="personal">Personal</option>
                        <option value="team">Team</option>
                    </select>
                </label>
                <label>
                    Ability Description (max length 10,000 chars):
                    <textarea id="AbilityDescription" rows={4} cols={50} maxLength={10000} required={true} style={{
                        resize: "both",
                    }} />
                </label>
                <label>
                    Ability Mechanics:
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;This section to come in a later update.
                </label>
                <input type="submit" value="Submit" />
            </div>
        </form>
    </>);
}