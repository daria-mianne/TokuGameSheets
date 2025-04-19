import { MenuBar } from "@components/menubar/MenuBar";
import { useMemoryOnlyDataStore } from "@datastore/memoryOnlyData";
import { fn } from '@storybook/test';

export default {
    title: 'Components/MenuBar/NonAdminMenuBar',
    component: MenuBar,
    tags: ['autodocs'],
};

const mockStore = fn(useMemoryOnlyDataStore).mockReturnValue({
    currentUser: {
        isAdmin: false,
    },
});

export const Example = {
    args: {
        dataStore: mockStore,
    }
};
