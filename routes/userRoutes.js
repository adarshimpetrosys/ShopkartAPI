const express        = require("express");
const userController = require("../controllers/userController");
const userRouter     = express.Router();
const auth           = require("../middlewares/auth")
 
userRouter.post("/api/register",userController.register);
userRouter.post("/api/login",userController.login);
userRouter.post("/api/forgotpassword-send-mail",userController.forgotpassword_send_mail);



userRouter.post("/api/forgotpassword-update/:id/:token",userController.userPassUpdate);

 module.exports = userRouter;