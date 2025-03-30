import { LocationProvider, ErrorBoundary } from 'preact-iso';
import { MenuBar } from '@components/menubar/MenuBar';
import AppRouter from '@components/routing/AppRouter';
import { useSessionStore } from '@datastore/sessionData';
import { useEffect, useState } from 'preact/hooks';
import { restoreSession } from '@hooks/api/users';
import { useMemoryOnlyDataStore } from '@datastore/memoryOnlyData';

export function App() {
    const { token } = useSessionStore();
    const { currentUser, setCurrentUser, clearCurrentUser } = useMemoryOnlyDataStore();
    // TODO: Get user's settings
    const [readyToShow, setReadyToShow] = useState(false);

    useEffect(() => {
        if (token && !currentUser) {
            setReadyToShow(false);
            void restoreSession(token).then((user) => {
                if (user) {
                    setCurrentUser(user);
                } else {
                    clearCurrentUser();
                }
                setReadyToShow(true);
            });
        } else {
            setReadyToShow(true);
        }
    }, []);

    return (
        <div
            className='dark' // TODO: skip this if the user enabled light mode
        >
            <div className='dark:bg-gray-900 dark:text-gray-200'>
                <MenuBar />
                <LocationProvider>
                    <ErrorBoundary>
                        {readyToShow && <AppRouter />}
                        {!readyToShow && <p>Loading...</p>}
                    </ErrorBoundary>
                </LocationProvider>
            </div>
        </div>
    );
}
