const User = require('../models/user');

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
    console.log('User fetched from server and sent to client');
  } catch (error) {
    next(error);
  }
};
