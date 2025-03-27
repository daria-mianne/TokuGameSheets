import { BaseBanner } from './BaseBanner';

interface ErrorBannerProps {
    id: string;
    message: string;
}

export function ErrorBanner(props: ErrorBannerProps) {
    return <BaseBanner statusSymbol='!!!' textColor='red' {...props} />;
}
