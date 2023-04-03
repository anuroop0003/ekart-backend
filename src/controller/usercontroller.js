const userService = require('../services/userservice');

module.exports = {
  createUser: async (req, res) => {
    try {
      await userService.creatUser(req.body);
      res.status(200).json({
        message: 'User created successfully',
      });
    } catch (error) {
      console.log(error)
      res.status(400).json(error);
    }
  },
  getProfile: async(req, res) => {
    console.log("mtl",req.payload)
    try {
      const profileData = await userService.profileGet(req.payload);
      res.status(200).json({
        message: 'Profile fetched successfully',
        data: profileData
      });
    } catch (error) {
      console.log(error)
      res.status(400).json(error);
    }
  }
};
