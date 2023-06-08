import { validateToken } from "../middleware/jwtToken";

const express = require('express');
const { UserController } = require('./user.controller');

const router = express.Router();

let userController = new UserController();

router.get("/", userController.get)

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/addWalletAddress", validateToken, userController.addWalletAddress);
module.exports = router