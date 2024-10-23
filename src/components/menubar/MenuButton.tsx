import { CSSProperties } from 'preact/compat';
import { useHoverCSS } from '../../hooks/styling/useHoverCSS';

export interface MenuButtonProps {
    name: string,
    destination: string,
};

export function MenuButton(props: MenuButtonProps) {
    const { name, destination } = props;

    const defaultCSS: CSSProperties = {
        color: '#F0F0F0',
        minWidth: '100px',
        maxWidth: '300px',
    };

    const hoverCSS: CSSProperties = {
        ...defaultCSS,
        backgroundColor: '#2030AC',
    }

    const css = useHoverCSS(defaultCSS, hoverCSS);

    return (
        <button {...css}>
            <a href={destination}>
                {name}
            </a>
        </button>
    )
}