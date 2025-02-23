import { CSSProperties } from 'preact/compat';
import { useHoverCSS } from 'src/frontend/hooks/styling/useHoverCSS';

export interface MenuButtonProps {
    name: string;
    destination: string;
}

export function MenuButton(props: MenuButtonProps) {
    const { name, destination } = props;

    const defaultCSS: CSSProperties = {
        backgroundColor: '#153080',
        border: '2px solid #3337AC',
        borderRadius: '8px',
        color: '#F0F0F0',
        cursor: 'pointer',
        fontSize: '1em',
        fontWeight: '500',
        fontFamily: 'inherit',
        margin: '0.5em 0.5em 0.5em 0.5em',
        minWidth: '100px',
        minHeight: '30px',
        padding: '0.6em 1.2em',
        placeItems: 'center',
        textAlign: 'center',
        textDecoration: 'none',
        transition: '0.25s',
    };

    const hoverCSS: CSSProperties = {
        ...defaultCSS,
        backgroundColor: '#2030AC',
        border: '2px solid #646CFF',
    };

    const hoverProps = useHoverCSS(defaultCSS, hoverCSS);

    return (
        <a {...hoverProps} href={destination}>
            {name}
        </a>
    );
}
