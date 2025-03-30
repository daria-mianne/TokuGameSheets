import { ReadonlySignal, useComputed } from '@preact/signals';
import { h, ComponentChildren } from 'preact';
import { forwardRef, InputHTMLAttributes } from 'preact/compat';

export type InputElementType = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export type InputProps<T extends InputElementType> = InputHTMLAttributes<T> & {
    name: string;
    required?: boolean;
    label?: string;
    value: ReadonlySignal<string | undefined>;
    error: ReadonlySignal<string>;
    children?: ComponentChildren;
};

export function BaseInput<T extends InputElementType>(inputType: string) {
    return forwardRef<T, InputProps<T>>(({ name, label, value, error, required, ...props }, ref) => {
        const inputElem = h(
            inputType,
            {
                ...props,
                ref,
                id: name,
                value: useComputed(() => value.value || ''),
                'aria-invalid': !!error.value,
                'aria-errormessage': `${name}-error`,
            },
            props.children
        );
        return (
            <div>
                {label && (
                    <label for={name}>
                        {label} {required && <span>*</span>}
                    </label>
                )}
                {inputElem}
            </div>
        );
    });
}
