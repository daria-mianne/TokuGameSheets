import { ErrorBanner } from '@components/banners';
import { ReadonlySignal, useComputed } from '@preact/signals';
import { forwardRef, InputHTMLAttributes } from 'preact/compat';

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date';
    label?: string;
    value: ReadonlySignal<string | undefined>;
    error: ReadonlySignal<string>;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ label, value, error, ...props }, ref) => {
    const { name, required } = props;
    return (
        <div>
            {label && (
                <label for={name}>
                    {label} {required && <span>*</span>}
                </label>
            )}
            <input
                {...props}
                ref={ref}
                id={name}
                value={useComputed(() => value.value || '')}
                aria-invalid={!!error.value}
                aria-errormessage={`${name}-error`}
            />
            {error.value && <ErrorBanner id={`${name}-error`} message={error.value} />}
        </div>
    );
});
