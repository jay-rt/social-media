import jwt from "jsonwebtoken";
import db from "../db/db.js";

//GET RELATIONSHIP
export const getRelation = (req, res) => {
  const q = `SELECT follower_user_id FROM relationships WHERE followed_user_id = ?`;
  db.query(q, [req.query.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map((rel) => rel.follower_user_id));
  });
};

//ADD RELATIONSHIP
export const addRelation = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Authorized!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is invalid!");

    const q =
      "INSERT INTO relationships (`follower_user_id`, `followed_user_id`) VALUES (?)";
    const values = [userInfo.id, req.body.userId];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Started following");
    });
  });
};

//DELETE RELATIONSHIP
export const deleteRelation = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Authrized!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is invalid!");

    const q =
      "DELETE FROM relationships WHERE `follower_user_id` = ? AND `followed_user_id` = ?";
    db.query(q, [userInfo.id, req.query.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollowed!");
    });
  });
};
