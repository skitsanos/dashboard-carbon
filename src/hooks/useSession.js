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

const useSession2 = create(set => ({
    session:
        localStorage.getItem('session') !== null
            ? JSON.parse(localStorage.getItem('session'))
            : {
                user: {},
                isLoggedIn: false
            },

    login: payload =>
    {
        const {ttl = 1} = payload;
        console.log(payload);

        console.log('Session expires on', new Date((new Date().getTime() + ttl * 60000)));

        set(payload, true);

        localStorage.setItem('session', JSON.stringify(payload));
    },

    logout: () =>
    {
        localStorage.clear();

        set({
            isLoggedIn: false,
            user: {}
        });
    }
}));

export default useSession;