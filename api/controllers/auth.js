import db from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//REGISTER
export const register = (req, res) => {
  //SEE IF USERNAME ALREADY EXISTS
  const q = "SELECT * from users WHERE username = ? OR email = ?";
  db.query(q, [req.body.username, req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //CREATE NEW USER IF USERNAME IS NOT TAKEN
    //HASHING THE PASSWORD
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (`name`, `username`, `email`, `password`) VALUE (?)";
    const values = [
      req.body.name,
      req.body.username,
      req.body.email,
      hashedPassword,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created successfully.");
    });
  });
};

//LOGIN
export const login = (req, res) => {
  const q = "SELECT * from users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    //CHECK IF USER EXISTS
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found");

    //CHECK FOR CORRECT PASSWORD
    const checkedPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkedPassword)
      return res.status(401).json("Incorrect username or password!");

    //GENERATING ACCESS TOKEN
    const accessToken = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET);

    //SEPERATING USER PASSWORD AND OTHER DATA
    const { password, ...others } = data[0];
    res
      .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
      .status(200)
      .json(others);
  });
};

//LOGOUT
export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
