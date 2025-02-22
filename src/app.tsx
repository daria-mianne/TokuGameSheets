import { lazy, LocationProvider, ErrorBoundary, Router, Route } from 'preact-iso';
import { MenuBar } from './components/menubar/MenuBar';
import { Home } from './components/pages/Home';
import { FourOhFour } from './components/pages/404';

const InvitationCreator = lazy(() => import('./components/forms/creation/InvitationCreator'));
const AccountCreator = lazy(() => import('./components/forms/creation/AccountCreator'));
const AbilityDesigner = lazy(() => import('./components/forms/creation/abilities/AbilityDesigner'));
const CharacterCreator = lazy(() => import('./components/forms/creation/CharacterCreator'));

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
                    <Router>
                        <Home path='/' />
                        <Route path='/invitation' component={InvitationCreator} />
                        <Route path='/ability-designer' component={AbilityDesigner} />
                        <Route path='/account-creator/:token' component={AccountCreator} />
                        <Route path='/characters/create' component={CharacterCreator} />
                        <FourOhFour default />
                    </Router>
                </ErrorBoundary>
            </LocationProvider>
        </div>
    );
}
