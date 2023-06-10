import { Utils } from "../utils/hashing";
import { UserServices } from "./user.services";
require("dotenv").config();

const userServices = new UserServices();
const utilService = new Utils();

//@desc Register Users
//@route GET /api/users/register
//@acsess public

export async function registerUser(req: any, res: any): Promise<any> {
  const { username, email, phone, password } = req.body;
  if (!username || !email || !phone || !password) {
    res.status(400).json({
      message: "Fill all the details",
    });
  }

  const userAvailable =
    (await userServices.findUserByEmail(email)) ||
    (await userServices.findUserByPhone(phone));
  if (userAvailable) {
    res.status(400).json({
      message: "Email id or Phone Number registered",
    });
  }

  const hashedPassword = await utilService.hashPassword(password);

  const user = await userServices.createUser({
    username,
    email,
    phone,
    password: hashedPassword,
  });

  if (user) {
    res
      .status(200)
      .json({ id: user.id, email: user.email, message: "User Created" });
  } else {
    res.status(400).json({
      message: "Data not valid",
    });
  }
}

//@desc Users Login
//@route POST /api/users/login
//@acsess public

export async function loginUser(req: any, res: any): Promise<any> {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      message: "All fields are mandatory",
    });
  }
  const user = await userServices.findUserByEmail(email);

  if (user && (await utilService.verifyPassword(password, user.password))) {
    const accessToken = utilService.createJwtToken(
      user.username,
      user.email,
      user.id
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(400).json({
      message: "Email or Password is not valid",
    });
  }
}

//@desc Add Wallet Address
//@route Post /api/users/addWalletAddress
//@acsess private

export async function addWalletAddress(req: any, res: any): Promise<any> {
  const { walletAddress } = req.body;
  if (!walletAddress) {
    res.status(400).json({
      message: "Please add wallet-address",
    });
  }

  const userAvailable = await userServices.findUserByWalletAddress(
    walletAddress
  );
  if (userAvailable) {
    res.status(400).json({
      message: "Wallet Address already registered",
    });
  }

  const user = await userServices.findUserById(req.user.id);
  if (user) {
    const updatedUser = await userServices.updateUser(req.user.id, {
      walletAddress,
    });
    res.status(200).json({ updatedUser });
  } else {
    res.status(400).json({
      message: "User not found",
    });
  }
}

//@desc Update User
//@route Put /api/users/update
//@acsess private

export async function updateUser(req: any, res: any): Promise<any> {
  const { username, email, phone, walletAddress } = req.body;
  if (!username || !email || !phone || !walletAddress) {
    res.status(400).json({
      message: "Fill all the details",
    });
  }
  const user = await userServices.findUserById(req.user.id);
  if (user) {
    let userAvailable = await userServices.findUserByEmail(email);
    if(!userAvailable || userAvailable._id.toString() == req.user.id){
      userAvailable  = await userServices.findUserByPhone(phone);
    }
    if(!userAvailable || userAvailable._id.toString() == req.user.id){
      userAvailable  = await userServices.findUserByWalletAddress(walletAddress);
    }
    if (userAvailable && userAvailable._id.toString() != req.user.id) {
      res.status(400).json({
        message: "Email id or Phone Number or WalletAddress registered",
      });
    } else {
      const updatedUser = await userServices.updateUser(req.user.id, {
        username,
        email,
        phone,
        walletAddress,
      });
      res.status(200).json({ updatedUser });
    }
  } else {
    res.status(400).json({
      message: "User not found",
    });
  }
}

//@desc Update User
//@route Put /api/users/update
//@acsess private

export async function deleteUser(req: any, res: any): Promise<any> {
  const user = await userServices.findUserById(req.user.id);
  if (user) {
      const deletedUser = await userServices.deleteUser(req.user.id);
      res.status(200).json({ deletedUser });
  } else {
    res.status(400).json({
      message: "User not found",
    });
  }
}