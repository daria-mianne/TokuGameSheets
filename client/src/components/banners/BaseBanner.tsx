export interface BannerProps {
    id: string;
    message: string;
    statusSymbol: string | SVGElement;
    textColor: string;
}

export function BaseBanner(props: BannerProps) {
    const status = typeof props.statusSymbol === 'string' ? <b>props.statusSymbol</b> : props.statusSymbol;

    return (
        <div
            style={{
                color: props.textColor,
                fontWeight: 'bold',
            }}
        >
            {status}&nbsp;{props.message}
        </div>
    );
}
