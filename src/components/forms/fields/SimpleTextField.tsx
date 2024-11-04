import { useState } from 'preact/hooks';
import { debounce } from 'lodash';
import { SimpleTextProps } from './types';
import ErrorBanner from '../ErrorBanner';

export function SimpleTextField(props: SimpleTextProps) {
    const [value, setValue] = useState(props.initialText || '');
    const debouncedSetValue = debounce(setValue, 100);

    const htmlProps = {
        columns: props.columns,
        maxLength: props.maxLength,
        onChange: debouncedSetValue,
        placeholder: props.placeholder,
        style: props.resizable
            ? {
                  resize: props.resizable,
              }
            : {},
    };

    return (
        <>
            {props.validation ? value.match(props.validation) ? '' : <ErrorBanner message={`Doesn't match pattern: ${props.validation}`} /> : ''}
            {props.resizable ? (
                <textarea {...htmlProps}>value</textarea>
            ) : (
                <input type='text' {...htmlProps}>
                    value
                </input>
            )}
        </>
    );
}
