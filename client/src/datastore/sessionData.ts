import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export interface SessionState {
    token: string | null;
    setToken: (token: string) => void;
    clearToken: () => void;
}

export const useSessionStore = create<SessionState>()(
    devtools(
        persist(
            (set) => ({
                token: null,
                setToken: (token: string) => set({ token }),
                clearToken: () => set({ token: null }),
            }),
            {
                name: 'session-data',
                partialize: (state) =>
                    Object.fromEntries(
                        Object.entries(state).filter(([key]) => !['setToken', 'clearToken'].includes(key))
                    ),
                storage: createJSONStorage(() => sessionStorage),
            }
        )
    )
);
