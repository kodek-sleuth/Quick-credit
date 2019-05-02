/* eslint-disable indent */
/* eslint-disable brace-style */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try
    {
        const token = req.headers.authorisation.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decode;
        next(decode);
    }

    catch (error)
    {
        res.status(401).json({
            Message: error,
        });
    }
};
