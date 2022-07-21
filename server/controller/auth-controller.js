import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { AuthModel } from "../models/auth-model.js"

export const getUsers = async (req, res) => {
  try {
    const id = req.params.id;
    AuthModel.findOne(id, (err, data) => {
      if (err) return response.status(500).send({ message: err.message || "Some error occurred while retrieving files." });
      return response.status(200).send(data);
    });
  } catch (error) {
    console.log(error);
  }
}



export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {

    const user = {
      id: crypto.randomBytes(16).toString("hex"),
      email,
      password: hashPassword
    };

    AuthModel.insert(user, (err, data) => {
      console.log(err)
      if (err) return res.status(500).send({ message: err.message || "Some error occurred while retrieving files." });
      console.log("registration completed.")
      return res.status(200).send(data);
    });

  } catch (error) {
    console.log(error);
  }
}

export const loginUser = async (req, res) => {
  console.log("logging in.")
  try {
    const { email, password } = req.body;
    AuthModel.findByEmail(email, async (err, data) => {
      if (err) {
        return res.status(404).send({ message: `Not found  with id ${req.params.id}.` });
      }
      const match = await bcrypt.compare(password, data.password);
      console.log(match)
      if (!match) return res.status(500).send({ msg: "password does not match." })
      const accessToken = jwt.sign({ id: data.id, email: data.email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
      });

      console.log(accessToken)
      return res.status(200).json({ accessToken, data });
    })
  } catch (err) { }
}

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken
    }
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update({ refresh_token: null }, {
    where: {
      id: userId
    }
  });
  res.clearCookie('refreshToken');
  return res.sendStatus(200);
}