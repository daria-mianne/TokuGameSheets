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

    return (<>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            position: 'sticky',
            backgroundColor: '#102064',
        }}>
            <MenuButton name='Home' destination='/' />
            {
                // FIXME: Make this check window.currentUser.isAdmin when the login functionality is added https://github.com/daria-mianne/TokuGameSheets/issues/5
                true ? <MenuButton name='Ability Designer' destination='/ability-designer' /> : ''
            }
            {
                Object.keys(standardButtons).map((name) => <MenuButton name={name} destination={standardButtons[name]} />)
            }
            <div style={{
                marginLeft: 'auto',
                display: 'flex',
            }}>
                {
                    <MenuButton name='Account' destination='/account' />
                }
            </div>
        </div>
    </>);
}
