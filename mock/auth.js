export default {
    'POST /api/auth/login': (req, res) =>
    {
        const {password} = req.body;

        if (password === 'demoDemo12')
        {
            res.status(200).json({
                token: 'mock-demo-token'
            });
        }
        else
        {
            res.status(403).json({
                error: {
                    message: 'Not authorized'
                }
            });
        }
    }
};