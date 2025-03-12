import { LocationProvider, ErrorBoundary } from 'preact-iso';
import { MenuBar } from '@components/menubar/MenuBar';
import AppRouter from '@components/AppRouter';
import { useSessionStore } from '@datastore/sessionData';
import { useEffect } from 'preact/hooks';
import { restoreSession } from '@hooks/api/users';
import { useMemoryOnlyDataStore } from '@datastore/memoryOnlyData';

export function App() {
    const { token } = useSessionStore();
    const { currentUser, setCurrentUser, clearCurrentUser } = useMemoryOnlyDataStore();
    useEffect(() => {
        if (token && !currentUser) {
            void restoreSession(token).then((user) => user ? setCurrentUser(user) : clearCurrentUser());
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
                    <AppRouter />
                </ErrorBoundary>
            </LocationProvider>
        </div>
    );
}
