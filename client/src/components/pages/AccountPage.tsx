export default function AccountPage() {
    const user = window.currentUser;

    if (!user) {
        return <p>Not logged in</p>;
    }

    return (
        <>
            <h1>My Account</h1>
            <p>Currently, there is no way to edit your account. This will come in a future update.</p>
            <h2>Username</h2>
            {user.username}
            <h2>Display Name</h2>
            {user.displayName}
            <h2>Email</h2>
            {user.recoveryEmail}
            <h2>Is Admin?</h2>
            {String(user.isAdmin) /* need explicit string conversion for boolean here */}
            <h2>Account Creation Date</h2>
            {user.createdAt}
        </>
    );
}
