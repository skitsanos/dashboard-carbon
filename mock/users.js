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
    'GET /api/users': (req, res) =>
    {
        const {page, pageSize, q} = req.query;

        const generatedUsers = [
            {
                key: 'user-skitsanos',
                name: 'Evgenios Skitsanos',
                email: chance().email(),
                uuiid: chance().guid()
            },
            ...Array.from({length: 10}, () => generateUser().next().value)
        ];

        res.status(200).json({
            result: q ? generatedUsers.filter(user => user.name.toLowerCase().includes(q.toLowerCase())) : generatedUsers,
            total: 100
        });
    }
};