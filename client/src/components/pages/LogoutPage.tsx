import { useSessionStore } from '@datastore/sessionData';
import { logout } from '@hooks/api/users';
import { useEffect } from 'preact/hooks';

export default function LogoutPage() {
    const { token, clearToken } = useSessionStore();

    useEffect(() => {
        if (token) {
            void logout(token).then(() => {
                clearToken();
                window.currentUser = null;
            });
        }
    }, [token]);
    
    if (token) {
        return <p>Logging you out...</p>;
    }

    return <p>You have been successfully logged out.</p>;
}
