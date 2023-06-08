import { Utils } from "../utils/hashing";
import { UserServices } from "./user.services";
const asyncHandler = require('express-async-handler');
require("dotenv").config();

//@desc Register Users
//@route GET /api/users/register
//@acsess public

export class UserController {
  public userService: any;
  public utilService: any;

  constructor() {
    this.userService = new UserServices();
    this.utilService = new Utils();
  }

  public get(req: any, res: any): any {
    console.log(1);
    res.status(200).json({
        message: 'Hello world',
    })
  };

  public async registerUser(req: any, res: any): Promise<any> {
    const { username, email, phone, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({
        message: "Not found",
      });
    }
    const userAvailable = await this.userService.findUserById(email);
    if (userAvailable) {
      res.status(400).json({
        message: "Email id registered",
      });
    }

    const hashedPassword = await this.utilService.hashPassword(password);

    const user = await this.userService.createOneUser({
      username,
      email,
      phone,
      password: hashedPassword,
    });

    if (user) {
      res.status(200).json({ id: user.id, email: user.email });
    } else {
      res.status(400).json({
        message: "Data not valid",
      });
    }
  }

  //@desc Users Login
  //@route POST /api/users/login
  //@acsess public

  async loginUser(req: any, res: any): Promise<any> {
    console.log("Request body is : ", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "All fields are mandatory",
      });
    }
    const user = await this.userService.findUserById(email);

    if (
      user &&
      (await this.utilService.verifyPassword(password, user.password))
    ) {
      const accessToken = await this.utilService.createJwtToken(
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
  //@route Get /api/users/addWalletAddress
  //@acsess private

  async addWalletAddress(req: any, res: any): Promise<any> {
    const { walletAddress } = req.body;
    if (!walletAddress) {
      res.status(400).json({
        message: "Please add wallet-address",
      });

      const user = await this.utilService.findOneUser(req.user.id);
      if (user) {
        const addAddress = this.utilService.updateUser(req.user.id, {
          walletAddress,
        });
        res.status(200).json({ addAddress });
      } else {
        res.status(400).json({
          message: "Wallet Address not updated",
        });
      }
    }
  }
}
