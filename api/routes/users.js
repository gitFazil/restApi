const express = require("express");
const userController = require("../controller/usersCtrl");

//i made here mistake in exporting Router;

const Router = express.Router();
Router.get("/", (req, res) => {
  res.status(200).json("welcome in user routing");
});

Router.post("/signin", userController.users_signin);
Router.post("/signup", userController.users_signup);

Router.delete("/:userId", userController.users_delete);

module.exports = Router;
