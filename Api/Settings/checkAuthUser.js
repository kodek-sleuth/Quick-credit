/* eslint-disable indent */
/* eslint-disable brace-style */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try
    {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_KEY_USER);
        req.userData = decode;
        next();
    }

    catch (error)
    {
        res.status(401).json({
            Message: 'User Authorisation required to access resource',
        });
    }
};