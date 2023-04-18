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
    async VerifySeller(req, res, next) {
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
            else{
                if(data.usertype === "seller") {
                    req.payload = payload
                }
                else{
                    return next(createHttpError.Unauthorized("You are not authorized"))
                }
            }
            next()
        }));
    },
    async VerifyBuyer(req, res, next) {
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
            else{
                if(data.usertype === "buyer") {
                    req.payload = payload
                }
                else{
                    return next(createHttpError.Unauthorized("You are not authorized"))
                }
            }
            next()
        }));
    },
    async VerifyAdmin(req, res, next) {
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
            else{
                if(data.usertype === "admin") {
                    req.payload = payload
                }
                else{
                    return next(createHttpError.Unauthorized("You are not authorized"))
                }
            }
            next()
        }));
    },
}