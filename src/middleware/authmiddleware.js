const Users = require("../db/models/userSchema");
const jsonwebtoken = require("jsonwebtoken");
const createHttpError = require("http-errors");

module.exports = {
    async VerifyUser(req, res, next) {
        if (!req.headers['access-token']) {
            return next(createHttpError.Unauthorized())
        }
        const token = req.headers['access-token'];
        jsonwebtoken.verify(token, process.env.TOKEN_SECRET, (async (err, payload) => {
            if (err) {
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                return next(createHttpError.Unauthorized(message))
            }
            const data = await Users.findById(payload.userId);
            if (!data) {
                return next(createHttpError.Unauthorized("User not exist"))
            }
            req.payload = payload
            next()
        }));
    },
}