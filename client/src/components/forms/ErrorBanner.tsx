interface ErrorBannerProps {
    message: string;
}

export default function ErrorBanner(props: ErrorBannerProps) {
    return (
        <div
            style={{
                color: 'red',
                fontWeight: 'bold',
            }}
        >
            <b>!!!</b>&nbsp;{props.message}
        </div>
    );
}
