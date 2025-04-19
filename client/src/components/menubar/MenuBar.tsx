import { useSessionStore } from '@datastore/sessionData';
import { MenuButton } from './MenuButton';
import { MemoryOnlyData, useMemoryOnlyDataStore } from '@datastore/memoryOnlyData';

interface ButtonMapping {
    [name: string]: string;
}

interface MenuBarProps {
    // To allow mocking
    dataStore?: MemoryOnlyData;
};

export function MenuBar(props: MenuBarProps) {
    const { token } = useSessionStore();
    const { currentUser } = props?.dataStore ?? useMemoryOnlyDataStore();

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
        'Invite Someone': '/invite',
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
                {currentUser?.isAdmin ? mappingToButtons(adminButtons) : ''}
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
