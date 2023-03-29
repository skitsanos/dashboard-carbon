export const track = {
    initialState: {},

    save: s => (type, payload) =>
    {
        // const {setState} = s;
        console.log(s);
        console.log(type, payload);
    }
};
