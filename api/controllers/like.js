import jwt from "jsonwebtoken";
import db from "../db/db.js";

//GET LIKES
export const getLikes = (req, res) => {
  const q = `SELECT user_id FROM likes WHERE post_id = ?`;
  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map((like) => like.user_id));
  });
};

//ADD LIKE
export const addLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Authorized!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is invalid!");

    const q = "INSERT INTO likes (`user_id`, `post_id`) VALUES (?)";
    const values = [userInfo.id, req.body.postId];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been liked!");
    });
  });
};

//REMOVE LIKE
export const removeLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Authrized!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is invalid!");

    const q = "DELETE FROM likes WHERE `user_id` = ? AND `post_id` = ?";
    db.query(q, [userInfo.id, req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Like have been removed from the post!");
    });
  });
};
