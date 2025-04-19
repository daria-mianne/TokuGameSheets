import { TextInput } from "@components/forms/inputs/TextInput";
import { signal } from "@preact/signals";

export default {
    title: 'Components/Forms/Inputs/TextInput',
    component: TextInput,
    tags: ['autodocs'],
};

export const Default = {
    args: {
        name: 'Default',
        value: signal(''),
        error: signal(''),
    }
};

export const WithLabel = {
    args: {
        name: 'WithLabel',
        label: 'Labeled text field',
        value: signal(''),
        error: signal(''),
    }
};

export const WithValue = {
    args: {
        name: 'WithValue',
        label: 'With a value',
        value: signal('some value'),
        error: signal(''),
    }
};

export const WithError = {
    args: {
        name: 'WithError',
        label: 'With an error',
        value: signal('some value'),
        error: signal('some error'),
    }
}
