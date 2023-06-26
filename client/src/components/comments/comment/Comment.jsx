import "./comment.scss";
import moment from "moment";
import { useSelector } from "react-redux";
import { currentUser } from "../../../redux/userSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";

const Comment = ({ comment, postId }) => {
  const user = useSelector(currentUser);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (commentId) => {
      return makeRequest.delete(`/comments/${commentId}`);
    },
    onSuccess: () => {
      //Invalidate and refetch
      queryClient.invalidateQueries(["comments", postId]);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(comment.id);
  };

  return (
    <div className="comment">
      <img src={"/upload/" + comment.profile_pic} alt="" />
      <div className="info">
        <span className="name">{comment.name}</span>
        <p>{comment.comment}</p>
      </div>
      <div className="right">
        <span className="date">{moment(comment.created_at).fromNow()}</span>
        {comment.user_id === user.id && (
          <button className="btn" onClick={handleDelete}>
            delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;
