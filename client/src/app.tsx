import { LocationProvider, ErrorBoundary } from 'preact-iso';
import { MenuBar } from '@components/menubar/MenuBar';
import AppRouter from '@components/AppRouter';

export function App() {
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
