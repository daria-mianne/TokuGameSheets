import { MenuButton } from "./MenuButton";


interface ButtonMapping {
    [name: string]: string
}

export function MenuBar() {
    const standardButtons: ButtonMapping = {
        'Character Creator': '/characters/create',
        'Character Editor': '/characters/edit',
        'Character Viewer': '/characters/view',
    };

    const adminButtons: ButtonMapping = {
        'Ability Designer': '/ability-designer',
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            height: '36px',
            width: '100%',
            position: 'sticky',
            backgroundColor: '#102064',
        }}>
            {
                // FIXME: Make this check window.currentUser.isAdmin when the login functionality is added https://github.com/daria-mianne/TokuGameSheets/issues/5
                Object.keys(adminButtons).map((name) => <MenuButton name={name} destination={adminButtons[name]} />)
            }
            {
                Object.keys(standardButtons).map((name) => <MenuButton name={name} destination={standardButtons[name]} />)
            }
        </div>
    )
}
