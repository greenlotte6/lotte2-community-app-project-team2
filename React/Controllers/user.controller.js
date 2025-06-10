import User from "../Models/user.js";

const userController = {};

userController.saveUser = async (userName, sid) => {
  let user = await User.findOne({ name: userName });

  if (!user) {
    user = new User({
      name: userName,
      token: sid,
      online: true,
    });
  } else {
    user.token = sid;
    user.online = true;
  }

  await user.save();
  return user;
};

userController.checkUser=async(sid)=>{
    const user = await User.findOne({token:sid})
    if(!user) throw new Error("user not found")
    return user;
}

export default userController;
