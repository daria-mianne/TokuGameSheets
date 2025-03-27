import { BaseBanner } from './BaseBanner';

interface SuccessBannerProps {
    message: string;
}

export function SuccessBanner(props: SuccessBannerProps) {
    return <BaseBanner statusSymbol=':)' textColor='green' {...props} />;
}
