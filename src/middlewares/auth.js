const jwt = require("jsonwebtoken");
const tokenHelper = require("../helpers/token");
const { UserModel } = require("../models");
const { AuthError } = require("../errors");
const Instructor = require("../models/instructorModel")

exports.user = async (req, res, next) => {
  try {
    const decodedToken = await getDecodedToken(req.get("Authorization"));
    if (decodedToken.scope !== 'login') {
      throw new AuthError('invalid auth token provided');
    }
    const user = await getUser(decodedToken.id);
    if (!user) {
      throw new AuthError("invalid auth token provided");
    }
    console.log(`user name ${user.name}`);
    req.user = user;
    next();
  } catch (error) {
    handleAuthErrors(next, error);
  }
};

const handleAuthErrors = (next, error) => {
  try {
    console.log(error);
    if (
      error instanceof AuthError ||
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.JsonWebTokenError
    ) {
      error.status = 401;
    }
    next(error);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getDecodedToken = async (authHeader) => {
  try {
    console.log("entered get decoded token utility....");
    if (!authHeader) {
      throw new AuthError("token not provided or user not logged in");
    }
    const authHeaderStringSplit = authHeader.split(" ");
    if (
      !authHeaderStringSplit[0] ||
      authHeaderStringSplit[0].toLowerCase() !== "bearer" ||
      !authHeaderStringSplit[1]
    ) {
      throw new AuthError("token not provided or user not logged in");
    }

    const token = authHeaderStringSplit[1];
    const decodedToken = tokenHelper.getDecodedToken(token);
    console.log(decodedToken);
    return decodedToken;
  } catch (error) {
    throw error;
  }
};

const getUser = async (userId) => {
  try {
    const user = await UserModel.findById(userId).lean();
    return user;
  } catch (error) {
    throw error;
  }
};


// INSTRUCTOR --- MIDDLEWARE

exports.instructorloggedIn = async function (req, res, next) {
  try {
    console.log('entered loggedin middleware..................')
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        msg: 'token not provided or instructor not logged in'
      });
    }
    const authHeaderStringSplit = authHeader.split(' ');
    if (!authHeaderStringSplit[0] || authHeaderStringSplit[0].toLowerCase() !== 'bearer' || !authHeaderStringSplit[1]) {
      return res.status(401).json({
        success: false,
        msg: 'token not provided or instructor not logged in'
      });
    }

    const token = authHeaderStringSplit[1];
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(`decoded token: ${decodedToken.instructor}`)
    const instructor = await Instructor.findById(decodedToken.instructor);
    if (!instructor) {
      return res.status(404).json({
        error: 'instructor not found'
      })
    }
    req.instructor = instructor.toObject();
    //delete req.user['password']
    next();

  } catch (err) {
    console.log('error in auth middleware/////////////////////////////////')
    console.log(err)
    if (err.name == 'TokenExpiredError' || err.name == 'JsonWebTokenError') {
      return res.status(400).json({
        success: false,
        msg: 'token expired, please login again'
      })
    }
    next(err);
  }
}

// ADMIN --- MIDDLEWARE

exports.adminloggedIn = async function (req, res, next) {
  try {
    console.log('entered loggedin middleware..................')
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        msg: 'token not provided or admin not logged in'
      });
    }
    const authHeaderStringSplit = authHeader.split(' ');
    if (!authHeaderStringSplit[0] || authHeaderStringSplit[0].toLowerCase() !== 'bearer' || !authHeaderStringSplit[1]) {
      return res.status(401).json({
        success: false,
        msg: 'token not provided or admin not logged in'
      });
    }

    const token = authHeaderStringSplit[1];
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(`decoded token: ${decodedToken.admin}`)
    const admin = await Instructor.findById(decodedToken.admin);
    if (!admin) {
      return res.status(404).json({
        error: 'admin not found'
      })
    }
    req.admin = admin.toObject();
    //delete req.user['password']
    next();

  } catch (err) {
    console.log('error in auth middleware/////////////////////////////////')
    console.log(err)
    if (err.name == 'TokenExpiredError' || err.name == 'JsonWebTokenError') {
      return res.status(400).json({
        success: false,
        msg: 'token expired, please login again'
      })
    }
    next(err);
  }
}