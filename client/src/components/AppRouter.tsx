import { Home } from '@components/pages/Home';
import { FourOhFour } from '@components/pages/404';
import { lazy, Route, Router, useLocation } from 'preact-iso';
import { useSessionStore } from '@datastore/sessionData';
import { useEffect } from 'preact/hooks';

const LoginForm = lazy(() => import('@components/forms/login/LoginForm'));
const LogoutPage = lazy(() => import('./pages/LogoutPage'));
const InvitationCreator = lazy(() => import('@components/forms/creation/accounts/InvitationCreator'));
const AccountCreator = lazy(() => import('@components/forms/creation/accounts/AccountCreator'));
const AbilityDesigner = lazy(() => import('@components/forms/creation/abilities/AbilityDesigner'));
const CharacterCreator = lazy(() => import('@components/forms/creation/characters/CharacterCreator'));
const AccountPage = lazy(() => import('@components/pages/AccountPage'));

export default function AppRouter() {
    const { token } = useSessionStore();
    const { path, url, route } = useLocation();

    useEffect(() => {
        if (!token && !path.startsWith('/login') && !path.startsWith('/signup/')) {
            const redirectUri = `/login?redirectUri=${encodeURIComponent(url.includes('logout') ? '/' : url)}`;
            route(redirectUri, true);
        }
    }, [token, path]);

    return (
        <Router>
            <Route path='/' component={Home} />
            <Route path='/login' component={LoginForm} />
            <Route path='/logout' component={LogoutPage} />
            <Route path='/signup' component={AccountCreator} />
            <Route path='/invitation' component={InvitationCreator} />
            <Route path='/ability-designer' component={AbilityDesigner} />
            <Route path='/account-creator/' component={AccountCreator} />
            <Route path='/characters/create' component={CharacterCreator} />
            <Route path='/myaccount' component={AccountPage} />
            <Route default component={FourOhFour} />
        </Router>
    );
}
