import jwt from "jsonwebtoken";
import db from "../db/db.js";

//GET POSTS
export const getComments = async (req, res) => {
  const q = `SELECT c.*, u.name, u.profile_pic FROM comments AS c JOIN users AS u ON (u.id = c.user_id) WHERE c.post_id = ?
    ORDER BY c.created_at DESC`;

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

//ADD COMMENT
export const addComment = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Authorized!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is invalid!");

    const q =
      "INSERT INTO comments (`comment`, `user_id`, `post_id`) VALUES (?)";
    const values = [req.body.comment, userInfo.id, req.body.postId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment successfully added.");
    });
  });
};

//DELETE COMMENTS
export const deleteComment = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Authorized!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is invalid!");

    const q = "DELETE FROM comments WHERE `id` = ? AND `user_id` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Successfully deleted comment!");
      return res.status(403).json("You can only delete your comment!");
    });
  });
};
