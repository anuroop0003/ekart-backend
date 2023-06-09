const User = require('../db/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Sellers = require('../db/models/sellerSchema');
const ObjectId=mongoose.Types.ObjectId
module.exports = {
  creatUser: async (data) => {
    const exist = await isExist({ mobile: data.mobile, email: data.email, usertype:data.usertype });
    if (exist) {
      throw { message: 'User already Exist', status: 400 };
    }
    const encryptedPassword = await encrypt(data.password);
    var userDetails = {
      email: data.email,
      mobile: data.mobile,
      password: encryptedPassword,
      usertype:data.usertype
    };
    let retundata=await User.create(userDetails);
    if(data.usertype=='seller'){
      let bindData=new Sellers({
        userId:new ObjectId(retundata._id),
        name:data.name
      })
      return await bindData.save()
    }
    // if(data.usertype === 'buyer') {
    //   let bindData=new Sellers({
    //     userId:new ObjectId(retundata._id),
    //     name:data.name
    //   })
    //   return await bindData.save()
    // }
    // if(data.usertype === 'admin') {
    //   let bindData=new Sellers({
    //     userId:new ObjectId(retundata._id),
    //     name:data.name
    //   })
    //   return await bindData.save()
    // }
  },
  profileGet: async(data) => {
    const userId = new ObjectId(data.userId);
    console.log("data", data,userId)
    const userExist = await User.findOne({_id : userId});
    const sellerExist = await Sellers.findOne({userId : userId});
    console.log("userExist",userExist);
    console.log("sellerExist",sellerExist)
    return { email: userExist.email, usertype: userExist.usertype, name: sellerExist.name}
  }
};

async function isExist(data) {
  return await User.findOne(data);
}

async function encrypt(password) {
  const salt = await bcrypt.genSalt(10);
  return  bcrypt.hash(password, salt);
}

async function compare(password, hash) {
  return await compare(password, hash);
}
