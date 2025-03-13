import { useMemoryOnlyDataStore } from "@datastore/memoryOnlyData";
import { useEffect, useState } from "preact/hooks";

export default function AccountPage() {
    const [showNotLoggedInWarning, setShowNotLoggedInWarning] = useState(false);
    const { currentUser } = useMemoryOnlyDataStore();

    useEffect(() => {
        setShowNotLoggedInWarning(!currentUser);
    }, [currentUser]);

    if (showNotLoggedInWarning) {
        return <p>Not logged in</p>;
    }

    return (
        <>
            <h1>My Account</h1>
            <p>Currently, there is no way to edit your account. This will come in a future update.</p>
            <h2>Username</h2>
            {currentUser?.username}
            <h2>Display Name</h2>
            {currentUser?.displayName}
            <h2>Email</h2>
            {currentUser?.recoveryEmail}
            <h2>Is Admin?</h2>
            {String(currentUser?.isAdmin) /* need explicit string conversion for boolean here */}
            <h2>Account Creation Date</h2>
            {currentUser?.createdAt}
        </>
    );
}
