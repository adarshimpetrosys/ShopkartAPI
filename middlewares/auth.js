// Middleware to authenticate token
const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {

  let authHeader = req.headers.authorization;
  // console.log(authHeader);

  if (!authHeader) {
    res.status(401).json("unAuthorized");
  }
  const token = authHeader.split(" ")[1];

  // console.log(token);
  try {

    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } 
  catch (error) {
    res.status(500).json(error);
  }
};

module.exports = auth;
