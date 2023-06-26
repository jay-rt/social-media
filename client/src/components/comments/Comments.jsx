import { useSelector } from "react-redux";
import Comment from "./comment/Comment";
import "./comments.scss";
import { currentUser } from "../../redux/userSlice";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useState } from "react";

const Comments = ({ postId }) => {
  const [comment, setComment] = useState("");

  const user = useSelector(currentUser);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(
    ["comments", postId],
    async () => {
      const res = await makeRequest.get(`/comments?postId=${postId}`);
      return res.data;
    }
  );

  const newCommentMutation = useMutation({
    mutationFn: (newComment) => {
      makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      //Invalidate and refetch comments
      queryClient.invalidateQueries(["comments", postId], { exact: true });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    newCommentMutation.mutate({ comment, postId });
    setComment("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={"/upload/" + user.profile_pic} alt="" />
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Send
        </button>
      </div>
      {error
        ? error.message
        : isLoading
        ? "loading"
        : data.map((comment) => (
            <Comment comment={comment} key={comment.id} postId={postId} />
          ))}
    </div>
  );
};

export default Comments;
