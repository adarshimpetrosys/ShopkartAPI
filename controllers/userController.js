const User = require("../models/User");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const  transporter  = require("../config/emailConfig");
const userController = {
  async register(req, res) {
    try {
      // checking user's existence

      const exists = await User.findOne({ email: req.body.email });
      //  console.log();

      if (exists !== null) {
        res.status(409).json({
          msg: "This Email is already exists",
          success: false,
        });
      }

      //   console.log(req.body);
      const hashedPass = await bcrypt.hash(req.body.password, 10);

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
      });

      const userResult = await user.save();

      if (userResult) {
        // res.json({ userResult, userAddress });
        res.status(201).json({
          msg: " Registraion Successfully",
          success: true,
          data: userResult,
        });
      } else {
        res.status(400).json({ msg: "Something went wrong" });
      }
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },
  // login
  async login(req, res) {
    try {
      let email = req.body.email;
      let password = req.body.password;

      const findUser = await User.findOne({ email: email });
      if (findUser) {
        const isMatch = await bcrypt.compare(password, findUser.password);
        if (isMatch) {
          const token = JWT.sign({ uId: findUser._id }, process.env.TOKEN_KEY, {
            expiresIn: "15 minutes",
          });
          //  console.log(token);
          res.json({ msg: " Login Successfully", success: true, token: token });
        } else {
          res.json({ msg: "Invalid Login Details", success: false });
        }
      } else {
        res.json({ msg: "Invalid Login Details", success: false });
      }
    } catch (error) {
      res.json({ msg: `Something Went Wrong ${error}`, success: false });
      console.log(error);
    }
  },

  async forgotpassword_send_mail(req, res) {
    const { email } = req.body;

    if (email) {
      const user = await User.findOne({ email: email });
      console.log(user);

      if (user) {
        const secret = user._id + process.env.TOKEN_KEY;
        const token = JWT.sign({ userID: user._id }, secret, {
          expiresIn: "15m",
        });
        const link = `http://localhost:3000/forgot-password/${user._id}/${token}`;

        console.log(link);
        // Send Email
        let info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "Shopkart - Password Reset Link",
          html: `<a href=${link}>Click Here</a> to Reset Your Password`,
        });

        
        res.json({
          msg: "Password Reset Email Sent....Please Check Your Email",
          "info":info,
          success: true,
        });
      } else {
        res.json({ msg: "User Not Found", success: false });
      }
    } else {
      res.json({ msg: "Email is Required", success: false });
    }
  },

  async userPassUpdate(req, res) {
    const { password, confirm_password } = req.body;

    const { id, token } = req.params;
    // console.log(password,confirm_password,id,token);
    const user = await User.findById({ _id: id });
    const new_secret = user._id + process.env.TOKEN_KEY;
    // console.log(user)
    try {
      JWT.verify(token, new_secret);

      if (password && confirm_password) {
        if (password !== confirm_password) {
          res.json({
            msg: "Password and Confirm Password doesn't match",
            success: false,
          });
        } else {
          const hashedPass = await bcrypt.hash(req.body.password, 10);
          await User.findByIdAndUpdate(user._id, {
            $set: {
              password: hashedPass,
            },
          });

          res.json({ msg: "Password Update Successfully", success: false });
        }
      } else {
        res.json({ msg: "Fields are Required", success: false });
      }
    } catch (error) {
      console.log(error);
      res.json({ msg: "Invalid Token", success: false });
    }
  },
};

module.exports = userController;
