import { fn } from '@storybook/test';

import { Button } from '@components/base';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
    title: 'Components/Base/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        onClick: { action: 'onClick' },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
    args: {
        primary: true,
        label: 'Button',
    },
};

export const Secondary = {
    args: {
        primary: false,
        label: 'Button',
    },
};

export const Large = {
    args: {
        size: 'large',
        label: 'Button',
    },
};

export const Medium = {
    args: {
        label: 'Button',
    },
};

export const Small = {
    args: {
        size: 'small',
        label: 'Button',
    },
};
