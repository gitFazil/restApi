const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.users_signin = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        res.status(401).json({
          msg: "Auth failed",
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (error, result) => {
          if (result) {
            let token = jwt.sign(
              {
                email: user[0].email,
                pass: user[0]._id,
              },
              process.env.secretKey,
              { expiresIn: "2h" }
            );
            return res.status(200).json({ msg: "Auth succeed", token: token });
          } else {
            return res.status(401).json({ msg: "Auth failed" });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        msg: "route not found",
      });
    });
};
exports.users_signup = (req, res) => {
  User.find({ email: req.body.email }).then((user) => {
    if (user.length >= 1) {
      res.status(409).json({ msg: "mail exist", length: user.length });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          res.status(500).json({ errorinHash: err });
        } else {
          let newUser = new User({
            _id: mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
          });
          newUser
            .save()
            .then((result) => {
              res
                .status(201)
                .json({ msg: "user created", length: result.length });
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        }
      });
    }
  });
};

exports.users_delete = (req, res) => {
  let id = req.params.userId;
  User.remove({ _id: id })
    .then((result) => {
      res.status(200).json("user deleted");
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
