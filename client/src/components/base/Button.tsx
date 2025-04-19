import { ButtonHTMLAttributes } from 'preact/compat';

export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    primary?: boolean;
    autoSize?: boolean;
    size?: ButtonSize;
    label: string;
}

const sizesToClasses = {
    small: 'px-4 py-2 rounded-sm text-sm',
    medium: 'px-8 py-4 rounded-md text-base',
    large: 'px-16 py-8 rounded-lg text-large',
};

const lightColors = 'bg-blue-600 text-gray-100 hover:bg-blue-700 hover:text-gray-200';
const darkColors = 'dark:bg-blue-900 dark:text-gray-300 dark:hover:bg-blue-950 dark:hover:text-gray-400';

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
                sizesToClasses[size],
                lightColors,
                darkColors,
                `button-${autoSize ? '' : 'non-'}resizable`,
                `btn-${primary ? 'primary' : 'secondary'}`,
            ].join(' ')}
            {...props}
        >
            {label}
        </button>
    );
}
