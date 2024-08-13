// this file will handle authentication related requests, basically, we will use the service functions and await their responses, after we will  use that to send anoother response, e.g. a success/fail response
import { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { userAuthentication, userRegistration } from "../services/authServices";

export const login = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const success = await userAuthentication(email, password);

    if (success) {
      res.cookie("token", success, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: false,
        sameSite: "strict", // Cookie is not sent with cross-site requests
        maxAge: 7200000,
      });
      res.status(200).json({ message: "Login successful" }); // Send success response
    } else {
      res.status(401).json({ message: "Invalid credentials" }); // Handle invalid credentials
    }
  } catch (error) {
    console.log(error);
    return false;
    // indicating there isn't anyone with that user and password
  }
};


export const register = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const {obj} = req.body;
        const success = await userRegistration(obj);

        if (success){
            res.status(200).json({ message: "Registration successful" });
        }else{
            res.status(401).json({message: "This email is already taken"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message: `server error: ${error}`})
    }
}