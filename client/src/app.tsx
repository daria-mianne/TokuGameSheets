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
            style={{
                backgroundColor: '#242424',
                color: 'rgba(255, 255, 255, 0.87)',
                fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
                fontSynthesis: 'none',
                textRendering: 'optimizeLegibility',
            }}
        >
            <MenuBar />
            <LocationProvider>
                <ErrorBoundary>
                    {readyToShow && <AppRouter />}
                    {!readyToShow && <p>Loading...</p>}
                </ErrorBoundary>
            </LocationProvider>
        </div>
    );
}
