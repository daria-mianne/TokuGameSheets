import { type FormStore, reset } from '@modular-forms/preact';
import { Button } from '@components/base';

type FormFooterProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    of: FormStore<any, any>;
};

export function FormFooter({ of: form }: FormFooterProps) {
    // FIXME: custom styling
    return (
        <footer class='flex space-x-3 px-2 md:space-x-4'>
            <Button primary type='submit' label='Submit' />
            <Button type='button' label='Reset' onClick={() => reset(form)} />
        </footer>
    );
}
