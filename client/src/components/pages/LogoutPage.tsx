import { useMemoryOnlyDataStore } from '@datastore/memoryOnlyData';
import { useSessionStore } from '@datastore/sessionData';
import { logout } from '@hooks/api/users';
import { useEffect } from 'preact/hooks';

export default function LogoutPage() {
    const { token, clearToken } = useSessionStore();
    const { clearCurrentUser } = useMemoryOnlyDataStore();

    useEffect(() => {
        if (token) {
            void logout(token).then(() => {
                clearToken();
                clearCurrentUser();
            });
        }
    }, [token]);

    if (token) {
        return <p>Logging you out...</p>;
    }

    return <p>You have been successfully logged out.</p>;
}
