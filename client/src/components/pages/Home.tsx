import { apiBaseUrl } from '@hooks/api/constants';
import { useEffect, useState } from 'preact/hooks';

const helloApiUrl = apiBaseUrl + '/hello';

export function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const helloAPICall = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(helloApiUrl);
            const data = await response.json();
            setMessage(data.message);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            setMessage('Error fetching hello message!');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        helloAPICall();
    }, []);

    // TODO: real component
    return (
        <>
            <h1>Welcome to the Home Page!</h1>
            <p>The server has a message for you: {isLoading ? 'Loading...' : message}</p>
        </>
    );
}
