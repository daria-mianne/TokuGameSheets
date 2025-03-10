import { useSessionStore } from '@datastore/sessionData';

export default function LogoutPage() {
    const { token, clearToken } = useSessionStore();
    if (token) {
        clearToken();
        return <p>Logging you out...</p>;
    }

    return <p>You have been successfully logged out.</p>;
}
