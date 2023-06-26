import jwt from "jsonwebtoken";
import db from "../db/db.js";

//GET POSTS
export const getPosts = async (req, res) => {
  const userId = req.query.userId;

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Authorized!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is invalid!");

    const q =
      userId !== "undefined"
        ? `SELECT p.*, u.name, u.profile_pic FROM posts AS p JOIN users AS u ON (u.id = p.user_id) WHERE p.user_id = ? ORDER BY p.created_at DESC`
        : `SELECT p.*, u.name, u.profile_pic FROM posts AS p JOIN users AS u ON (u.id = p.user_id) LEFT JOIN relationships AS r ON (r.followed_user_id = p.user_id ) WHERE r.follower_user_id = ? OR p.user_id = ? ORDER BY p.created_at DESC`;

    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

//ADD NEW POSTS
export const addPost = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Authorized!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is invalid!");

    const q = "INSERT INTO posts (`user_id`, `desc`, `img`) VALUES (?)";
    const values = [userInfo.id, req.body.desc, req.body.img];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Successfully added new post!");
    });
  });
};

//DELETE POSTS
export const deletePost = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Authorized!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is invalid!");

    const q = "DELETE FROM posts WHERE `id` = ? AND `user_id` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Successfully deleted post!");
      return res.status(403).json("You can only delete your post!");
    });
  });
};
