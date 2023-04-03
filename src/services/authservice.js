const jwt = require('jsonwebtoken');

module.exports = {
  generateAccessToken:async (userId) => {
    try {
      return await jwt.sign(userId, process.env.TOKEN_SECRET);
    } catch (error) {
      console.log(error);
    }
  },
};
