import { ReadonlySignal, useComputed } from '@preact/signals';
import { forwardRef, InputHTMLAttributes } from 'preact/compat';

export type TextAreaInputProps = InputHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    label?: string;
    value: ReadonlySignal<string | undefined>;
    error: ReadonlySignal<string>;
};

export const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
    ({ label, value, error, ...props }, ref) => {
        const { name, required } = props;
        return (
            <div>
                {label && (
                    <label for={name}>
                        {label} {required && <span>*</span>}
                    </label>
                )}
                <textarea
                    {...props}
                    ref={ref}
                    id={name}
                    value={useComputed(() => value.value || '')}
                    aria-invalid={!!error.value}
                    aria-errormessage={`${name}-error`}
                />
            </div>
        );
    }
);
