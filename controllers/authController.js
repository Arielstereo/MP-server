import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerService = async (req, res) => {
  try {
    const { username, lastName, email, password, alias } = req.body;

    if (!username || !lastName || !email || !password || !alias) {
      return res.json({ 
        status: "Undefined",
        message: "Todos los campos son obligatorios!"
      })
    }

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.json({ 
        status: "EmailError",
        message: "El email que ingresaste ya existe!"
       });
    }

    const aliasExists = await User.findOne({ alias });

    if (aliasExists) {
      return res.json({ 
        status: "AliasError",
        message: "El alias ya existe, elige otro por favor!"
       });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const registerUser = new User({ username, lastName, email, password: hashPassword, alias });
    await registerUser.save();
    res.status(200).json({
      message: "Registracion exitosa!",
      status: "success",
      data: {
        user: registerUser.username,
        lastName: registerUser.lastName,
        alias: registerUser.alias,
        email: registerUser.email
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

export const loginService = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ 
        status:"Undefined",
        message: "Complete todos los campos!"
      })
    }

    const dbUser = await User.findOne({ email });

    if (!dbUser) {
      return res.json({ 
        status: "InvalidEmail",
        message: "Email incorrecto!"
       });
    }
    const comparePassword = await bcrypt.compare(password, dbUser.password);

    if (!comparePassword) {
      return res.json({ 
        status: "PassInvalid",
        message: "Contraseña incorrecta!"
       });
    }

    const token = jwt.sign({ id: dbUser._id }, process.env.TOKEN_SECRET, {expiresIn: "1h"});

    res.status(200).json({
      message: "Login successful",
      status: "success",
      data: {
        token: token,
        id: dbUser._id,
        username: dbUser.username,
        lastName: dbUser.lastName,
        email: dbUser.email,
        amount: dbUser.amount,
        alias: dbUser.alias,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

export const profileService = async (req, res) => {
  try {
    const { id } = req.params;

    const userProfile = await User.findById(id);

    if (!userProfile) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({
      status: "success",
      data: {
        user: userProfile,
      },
    });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

export const editAliasService = async (req, res) => {
  try {
    const { id, alias } = req.body;

    const user = await User.findById(id);

    const aliasExists = await User.findOne({ alias });

    if (aliasExists) {
      return res.json({
        status: "failed",
        message: "El alias ya existe, ingresa otro por favor!",
      });
    }

    user.alias = alias;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "El alias ha sido modificado con exito!",
      data: {
        alias: user.alias,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
