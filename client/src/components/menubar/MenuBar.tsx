import { useSessionStore } from '@datastore/sessionData';
import { MenuButton } from './MenuButton';
import { useMemoryOnlyDataStore } from '@datastore/memoryOnlyData';

interface ButtonMapping {
    [name: string]: string;
}

export function MenuBar() {
    const { token } = useSessionStore();
    const { currentUser } = useMemoryOnlyDataStore();

    const standardButtons: ButtonMapping = {
        'Character Creator': '/characters/create',
        'Character Editor': '/characters/edit',
        'Character Viewer': '/characters/view',
    };

    const rightSideButtons: ButtonMapping =
        token === null
            ? {
                  Login: '/login',
              }
            : {
                  Account: '/myaccount',
                  Logout: '/logout',
              };

    const adminButtons: ButtonMapping = {
        'Invite Someone': '/invitation',
        'Ability Designer': '/ability-designer',
    };

    const mappingToButtons = (buttons: ButtonMapping) =>
        Object.keys(buttons).map((name) => <MenuButton name={name} destination={buttons[name]} />);

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
                    currentUser?.isAdmin ? mappingToButtons(adminButtons) : ''
                }
                {mappingToButtons(standardButtons)}
                <div
                    style={{
                        marginLeft: 'auto',
                        display: 'flex',
                    }}
                >
                    {mappingToButtons(rightSideButtons)}
                </div>
            </div>
        </>
    );
}
