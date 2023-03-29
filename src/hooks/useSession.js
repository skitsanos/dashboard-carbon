import {create} from 'zustand';

const SESSION_STORAGE_KEY = 'session';

const useSession = create((set, get) => ({
    session: localStorage.getItem(SESSION_STORAGE_KEY) !== null
        ? JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY))
        : null,

    login: (newSession) =>
    {
        set({session: newSession});
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession));
    },
    logout: () =>
    {
        set({session: null});
        localStorage.removeItem(SESSION_STORAGE_KEY);
    },

    restoreSessionFromLocalStorage: () =>
    {
        const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);
        if (storedSession)
        {
            set({session: JSON.parse(storedSession)});
        }
    }
}));

export default useSession;