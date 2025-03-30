import { ButtonHTMLAttributes } from 'preact/compat';

export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    primary?: boolean;
    autoSize?: boolean;
    size?: ButtonSize;
    label: string;
}

/**
 * Base Button component for the UI.
 *
 * @param {boolean} [primary=false] whether the button is a primary button or not
 * @param {boolean} [autoSize=false] whether to allow the button to grow to fit its label (default)
 * @param {ButtonSize} [size='medium'] base size for the button
 * @param {string} label the label for the button
 * @param {function} props.onClick what to do when the button is clicked
 */
export function Button({ primary = false, autoSize = false, size = 'medium', label, ...props }: ButtonProps) {
    return (
        <button
            type='button'
            className={[
                `button-${size}`,
                `button-${autoSize ? '' : 'non-'}resizable`,
                `button-${primary ? 'primary' : 'secondary'}`,
            ].join(' ')}
            {...props}
        >
            {label}
        </button>
    );
}
