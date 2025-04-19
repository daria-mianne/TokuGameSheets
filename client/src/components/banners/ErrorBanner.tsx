import { Signal } from '@preact/signals';
import { BaseBanner } from './BaseBanner';

interface ErrorBannerProps {
    id: string;
    message: string | Signal<string>;
}

export function ErrorBanner(props: ErrorBannerProps) {
    return <BaseBanner statusSymbol='!!!' textColor='red' {...props} />;
}
