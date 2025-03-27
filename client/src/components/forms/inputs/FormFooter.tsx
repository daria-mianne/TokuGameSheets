import { type FormStore, reset } from '@modular-forms/preact';
import { Button } from '@components/base';

type FormFooterProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    of: FormStore<any, any>;
};

export function FormFooter({ of: form }: FormFooterProps) {
    // FIXME: custom styling
    return (
        <footer class='flex space-x-6 px-8 md:space-x-8 lg:hidden'>
            <Button primary type='submit' label='Submit' />
            <Button type='button' label='Reset' onClick={() => reset(form)} />
        </footer>
    );
}
