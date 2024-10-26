import { MenuButton } from './MenuButton';

interface ButtonMapping {
    [name: string]: string;
}

export function MenuBar() {
    const standardButtons: ButtonMapping = {
        'Character Creator': '/characters/create',
        'Character Editor': '/characters/edit',
        'Character Viewer': '/characters/view',
    };

    const adminButtons: ButtonMapping = {
        'Invite Someone': '/invitation',
        'Ability Designer': '/ability-designer',
    };

    const mappingToButtons = (buttons: ButtonMapping) => Object.keys(buttons).map((name) => <MenuButton name={name} destination={buttons[name]} />);

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'sticky',
                    backgroundColor: '#102064',
                }}
            >
                <MenuButton name='Home' destination='/' />
                {
                    // FIXME: Make this check window.currentUser.isAdmin when the login functionality is added https://github.com/daria-mianne/TokuGameSheets/issues/5 and remove the eslint comment
                    // eslint-disable-next-line no-constant-condition
                    true ? mappingToButtons(adminButtons) : ''
                }
                {mappingToButtons(standardButtons)}
                <div
                    style={{
                        marginLeft: 'auto',
                        display: 'flex',
                    }}
                >
                    {<MenuButton name='Account' destination='/account' />}
                </div>
            </div>
        </>
    );
}
