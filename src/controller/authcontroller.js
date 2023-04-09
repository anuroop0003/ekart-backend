const { userExist } = require('../db/user');
const { generateAccessToken } = require('../services/authservice');
const bcrypt = require('bcrypt');

module.exports = {
  signIn: async (req, res) => {
    const isUserExist = await userExist({ email: req.body.email });
   
    console.log("isUserExist", isUserExist);
    try {
      if (isUserExist) {
        const decryptPassword = await compare(
          req.body.password,
          isUserExist?.password,
        );
        if(decryptPassword){
        const auth = await generateAccessToken({ userId: isUserExist._id, usertype: isUserExist.usertype});
        res.status(200).json({
          message: 'Login was successful',
          data: { 'acces_token': auth, 'user_type': isUserExist.usertype},
        })}else{
          res.status(400).json({
            message: 'Password does not match',
          });
        }
      } else {
        res.status(400).json({
          message: 'Please provide valid identifying information',
        });
      }
    } catch (error) {
     console.log(error);
    }
  },
};

async function compare(password, hash) {
  return await bcrypt.compare(password, hash);
}
