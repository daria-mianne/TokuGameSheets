import { Home } from '@components/pages/Home';
import { FourOhFour } from '@components/pages/404';
import { lazy, Route, Router } from 'preact-iso';
import { AdminRoute } from './AdminRoute';
import { LoggedInRoute } from './LoggedInRoute';

const LoginForm = lazy(() => import('@components/forms/login/LoginForm'));
const LogoutPage = lazy(() => import('../pages/LogoutPage'));
const InvitationCreator = lazy(() => import('@components/forms/creation/accounts/InvitationCreator'));
const AccountCreator = lazy(() => import('@components/forms/creation/accounts/AccountCreator'));
const AbilityDesigner = lazy(() => import('@components/forms/creation/abilities/AbilityDesigner'));
const CharacterCreator = lazy(() => import('@components/forms/creation/characters/CharacterCreator'));
const AccountPage = lazy(() => import('@components/pages/AccountPage'));

export default function AppRouter() {
    return (
        <Router>
            {/* Routes anyone can hit */}
            <Route path='/' component={Home} />
            <Route path='/login' component={LoginForm} />
            <Route path='/signup' component={AccountCreator} />

            {/* Routes you have to be logged in to hit */}
            <LoggedInRoute path='/logout' component={LogoutPage} />
            <LoggedInRoute path='/characters/create' component={CharacterCreator} />
            <LoggedInRoute path='/myaccount' component={AccountPage} />

            {/* Routes you have to be logged into an admin account to hit */}
            <AdminRoute path='/invite' component={InvitationCreator} />
            <AdminRoute path='/ability-designer' component={AbilityDesigner} />

            {/* Default route */}
            <Route default component={FourOhFour} />
        </Router>
    );
}
