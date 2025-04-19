import { TextAreaInput } from "@components/forms/inputs/TextAreaInput";
import { signal } from "@preact/signals";

export default {
    title: 'Components/Forms/Inputs/TextAreaInput',
    component: TextAreaInput,
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

export const ResizableVertically = {
    args: {
        name: 'ResizableVert',
        label: 'Vertically resizable text field',
        value: signal(''),
        error: signal(''),
        style: { resize: 'vertical' },
    }
};

export const ResizableHorizontally = {
    args: {
        name: 'ResizableHori',
        label: 'Horizontally resizable text field',
        value: signal(''),
        error: signal(''),
        style: { resize: 'horizontal' },
    }
};

export const ResizableBoth = {
    args: {
        name: 'ResizableBoth',
        label: 'Vertically and horizontally resizable text field',
        value: signal(''),
        error: signal(''),
        style: { resize: 'both' },
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
