const express = require("express");
const userRouter = express.Router();
const JWT = require("jsonwebtoken");
const passport = require("passport");
const passportConfig = require("../passport");
const User = require("../models/User");
const Blogs = require("../models/Blogs");

const signToken = (userId) => {
  return JWT.sign(
    {
      iss: "MERN_app",
      sub: userId,
    },
    "Applore",
    { expiresIn: "1h" }
  );
};

userRouter.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    if (user)
      res.status(400).json({
        message: { msgBody: "Username is already taken", msgError: true },
      });
    else {
      const newUser = new User({ username, password, role });
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else
          res.status(201).json({
            message: {
              msgBody: "Account successfully created",
              msgError: false,
            },
          });
      });
    }
  });
});
userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  }
);

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({
      user: {
        username: "",
        role: "",
      },
      success: true,
    });
  }
);

userRouter.post(
  "/blog",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const blog = new Blogs(req.body);
    blog.save((err) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgError: true } });
      else {
        req.user.blogs.push(blog);
        req.user.save((err) => {
          if (err)
            res.status(500).json({
              message: { msgBody: "Error has occured", msgError: true },
            });
          else
            res.status(200).json({
              message: {
                msgBody: "Successfully created todo",
                msgError: false,
              },
            });
        });
      }
    });
  }
);

userRouter.get(
  "/blogs",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate("blogs")
      .exec((err, document) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else {
          res.status(200).json({
            blogs: document.blogs,
            authenticated: true,
          });
        }
      });
  }
);

userRouter.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      res.status(200).json({
        message: {
          messageBody: "You are an Admin",
        },
        messageError: false,
      });
    } else {
      res.status(403).json({
        message: {
          messageBody: "You are not an Admin",
        },
        messageError: true,
      });
    }
  }
);

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({
      isAuthenticated: true,
      user: { username, role },
    });
  }
);

userRouter.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { _id } = req.body;
    console.log(req.body);
    Blogs.findByIdAndRemove({ _id: _id }, function (err) {
      if (err) {
        res.status(500).json({
          message: { msgBody: "Error has occured", msgError: true },
        });
      } else {
        res.status(200).json({
          message: {
            msgBody: "Successfully deleted the blog",
            msgError: false,
          },
        });
      }
    });

    // (req, res) => {
    //   const blog = new Blogs(req.body);
    //   blog.save((err) => {
    //     if (err)
    //       res.status(500).json({
    //         message: { msgBody: "Error has occured", msgError: true },
    //       });
    //     else {
    //       const x = req.user.blogs.findIndex((b) => b._id === blog._id);
    //       req.user.blogs.splice(x, 1);
    //       console.log(req.user.blogs);
    //       req.user.save((err) => {
    //         if (err)
    //           res.status(500).json({
    //             message: { msgBody: "Error has occured", msgError: true },
    //           });
    //         else
    //           res.status(200).json({
    //             message: {
    //               msgBody: "Successfully created todo",
    //               msgError: false,
    //             },
    //           });
    //       });
    //     }
    //   });
    // };
  }
);

module.exports = userRouter;
