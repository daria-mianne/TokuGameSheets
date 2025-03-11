import { User } from '@models/user';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface MemoryOnlyData {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
}

// FIXME: better name pls
export const useMemoryOnlyDataStore = create<MemoryOnlyData>()(
    devtools((set) => ({
        currentUser: null,
        setCurrentUser: (user: User | null) => set({ currentUser: user }),
    }))
);
