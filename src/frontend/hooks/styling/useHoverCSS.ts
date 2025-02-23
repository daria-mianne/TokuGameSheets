import { CSSProperties } from 'preact/compat';
import { useState } from 'preact/hooks';

export function useHoverCSS(defaultStyle: CSSProperties = {}, hoverStyle: CSSProperties) {
    const [style, setStyle] = useState(defaultStyle);

    const onMouseEnter = () => setStyle(hoverStyle);
    const onMouseLeave = () => setStyle(defaultStyle);

    return {
        style,
        onMouseEnter,
        onMouseLeave,
    };
}
