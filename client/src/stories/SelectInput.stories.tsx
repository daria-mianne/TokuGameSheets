import { SelectInput } from "@components/forms/inputs/SelectInput";
import { signal } from "@preact/signals";

export default {
    title: 'Components/Forms/Inputs/SelectInput',
    component: SelectInput,
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
        label: 'Labeled dropdown field',
        value: signal(''),
        error: signal(''),
    }
};

const defaultChildren = [
    <option key={1} value='option 1'>Option 1</option>,
    <option key={2} value='option 2'>Option 2</option>,
];

export const WithChildren = {
    args: {
        name: 'WithChildren',
        label: 'With children to select',
        value: signal(''),
        error: signal(''),
        children: defaultChildren,
    }
};

export const WithValue = {
    args: {
        name: 'WithValue',
        label: 'With a default value',
        value: signal('option 1'),
        error: signal(''),
        children: defaultChildren,
    }
};

export const WithError = {
    args: {
        name: 'WithError',
        label: 'With an error',
        value: signal('option 2'),
        error: signal('some error'),
        children: defaultChildren,
    }
}
