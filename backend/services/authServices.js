import User from "../models/userModel.js";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();
const saltedRounds = 10;

export const userAuthentication = async (reqEmail, password) => {
  try {
    const person = await User.findOne({ email: reqEmail }).exec();

    if (!person) {
      return "Incorrect Email or Password";
    }

    const userPassword = person.password;
    const matchedPassword = await bcrypt.compare(password, userPassword);

    if (!matchedPassword) {
      return "Incorrect Email or Password";
    }

    const idtoken = jwt.sign(
      {
        _id: person._id?.toString(),
        name: `${person.firstname} ${person.surname}`,
      },
      SECRET,
      {
        expiresIn: "2 hours",
      }
    );

    // create an access token also

    return {
      user: {
        _id: person?._id?.toString(),
        firstname: person?.firstname,
      },
      token: idtoken,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const userRegistration = async (userData) => {
  try {
    console.log(userData)
    const hashedPassword = await bcrypt.hash(userData.password, saltedRounds);
    const existingEmail = User.findOne({email: userData.email});

    if(!(await existingEmail.exec())){
      const customer = new User({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        firstname: userData.firstname,
        surname: userData.surname,
      });
  
      const newCustomer = await customer.save();
      console.log(newCustomer);
      return newCustomer;
    }


  } catch (error) {
    console.error(error);
    throw error;
  }
};
