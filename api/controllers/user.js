import jwt from "jsonwebtoken";
import db from "../db/db.js";

//GET USER
export const getUser = (req, res) => {
  const q = "SELECT * from users WHERE id = ?";
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);

    //SEPERATING USER PASSWORD AND OTHER DATA
    const { password, ...others } = data[0];
    return res.status(200).json(others);
  });
};

//UPDATE USER
export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Authorized!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is invalid!");

    const q =
      "UPDATE users SET `name` = ?, `username` = ?, `email` = ?, `city` = ?, `website` = ?, `profile_pic` = ?, `cover_pic` = ? WHERE `id` = ?";
    const values = [
      req.body.name,
      req.body.username,
      req.body.email,
      req.body.city,
      req.body.website,
      req.body.profile_pic,
      req.body.cover_pic,
      userInfo.id,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 1)
        return res.status(200).json("Update Successful!");
      return res.status(403).json("You can update only your profile");
    });
  });
};

//USER SUGGESTION
export const userSuggestion = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Authorized!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is invalid!");

    const q = `SELECT id, name, profile_pic FROM users WHERE id != ? and id NOT IN (SELECT followed_user_id FROM relationships WHERE follower_user_id = ?)`;

    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
