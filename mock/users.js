import chance from 'chance';

const generateUser = function* ()
{
    yield {
        key: chance().guid(),
        name: chance().name(),
        email: chance().email(),
        uuiid: chance().guid()
    };
};

export default {
    'GET /api/users': {
        result: [
            {
                key: 'user-skitsanos',
                name: 'Evgenios Skitsanos',
                email: chance().email(),
                uuiid: chance().guid()
            },
            ...Array.from({length: 10}, () => generateUser().next().value)
        ],
        total: 100
    }
};