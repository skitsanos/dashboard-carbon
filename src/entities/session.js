export const session = {
    initialState:
        localStorage.getItem('session') !== null
            ? JSON.parse(localStorage.getItem('session'))
            : {
                user: {},
                isLoggedIn: false
            },

    logout: s => () =>
    {
        const {setState} = s;

        localStorage.clear();

        setState({
            isLoggedIn: false,
            user: {}
        });
    },

    login: s => payload =>
    {
        const {setState} = s;

        const {ttl = 1} = payload;

        console.log('Session expires on', new Date((new Date().getTime() + ttl * 60000)));

        setState(payload);

        localStorage.setItem('session', JSON.stringify(payload));
    }
};