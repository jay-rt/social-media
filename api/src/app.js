import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "../routes/auth.js";
import userRoute from "../routes/users.js";
import postRoute from "../routes/posts.js";
import commentRoute from "../routes/comments.js";
import likeRoute from "../routes/likes.js";
import uploadRoute from "../routes/upload.js";
import relationshipRoute from "../routes/relationships.js";

const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/likes", likeRoute);
app.use("/api/relationships", relationshipRoute);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
