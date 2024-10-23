import { CSSProperties, useState } from "preact/compat";

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