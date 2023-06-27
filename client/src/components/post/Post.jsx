import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useState } from "react";
import moment from "moment";
import Comments from "../comments/Comments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/userSlice";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector(currentUser);
  const queryClient = useQueryClient();

  const handleClick = () => {
    setCommentOpen((prev) => !prev);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: async () => {
      const res = await makeRequest.get(`/likes?postId=${post.id}`);
      return res.data;
    },
  });

  const likeMutation = useMutation({
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete(`/likes?postId=${post.id}`);
      return makeRequest.post("/likes", { postId: post.id });
    },
    onSuccess: () => {
      //Invalidate and refetch
      queryClient.invalidateQueries(["likes", post.id]);
    },
  });

  const handleLike = () => {
    likeMutation.mutate(data.includes(user.id));
  };

  const deleteMutation = useMutation({
    mutationFn: (postId) => {
      return makeRequest.delete(`/posts/${postId}`);
    },
    onSuccess: () => {
      //Invalidate and refetch
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  return (
    <div className="post">
      <div className="post__top">
        <div className="user">
          <img src={"/upload/" + post.profile_pic} alt="profile" />
          <div className="user__info">
            <Link to={`/profile/${post.user_id}`} className="link">
              <span className="name">{post.name}</span>
            </Link>
            <span className="date">{moment(post.created_at).fromNow()}</span>
          </div>
        </div>
        <MoreHorizIcon
          className="icon"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        {menuOpen && post.user_id === user.id && (
          <button onClick={handleDelete}>delete</button>
        )}
      </div>
      <div className="post__content">
        <p>{post.desc}</p>
        <img src={"/upload/" + post.img} alt="" />
      </div>
      <div className="post__bottom">
        {isLoading ? (
          "loading"
        ) : error ? (
          error.message
        ) : (
          <>
            <div className="item">
              {data.includes(user.id) ? (
                <FavoriteOutlinedIcon
                  className="like icon"
                  onClick={handleLike}
                />
              ) : (
                <FavoriteBorderOutlinedIcon
                  className="icon"
                  onClick={handleLike}
                />
              )}
              {data.length > 1 ? data.length + " Likes" : data.length + " Like"}
            </div>
            <div className="item" onClick={handleClick}>
              <TextsmsOutlinedIcon className="icon" />
              View Comments
            </div>
            <div className="item">
              <ShareOutlinedIcon className="icon" />
              Share
            </div>
          </>
        )}
      </div>
      {commentOpen && <Comments postId={post.id} />}
    </div>
  );
};

export default Post;
