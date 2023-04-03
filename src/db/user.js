const Users = require('./models/userSchema');

module.exports = {
  async create(data) {
    return await Users.create(data);
  },

  async update(data, id) {
    return await Users.updateOne(data, {
      where: {
        id: id,
      },
    });
  },

  async getAll() {
    return await Users.find();
  },

  async findOne(data) {
    return await Users.findOne(data);
  },

  async userExist(data) {
    return await Users.findOne(data);
  },
};
