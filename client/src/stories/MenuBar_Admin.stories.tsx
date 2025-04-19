import { MenuBar } from "@components/menubar/MenuBar";
import { useMemoryOnlyDataStore } from "@datastore/memoryOnlyData";
import { fn } from '@storybook/test';

export default {
    title: 'Components/MenuBar/AdminMenuBar',
    component: MenuBar,
    tags: ['autodocs'],
};

// FIXME: Figure out why this doesn't cause the story to actually show the admin buttons
const mockStore = fn(useMemoryOnlyDataStore).mockReturnValue({
    currentUser: {
        isAdmin: true,
    },
});

export const Example = {
    args: {
        dataStore: mockStore,
    }
};
