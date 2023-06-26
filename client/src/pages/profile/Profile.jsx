import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/userSlice";
import { useState } from "react";
import Update from "../../components/update/Update";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { id } = useParams();
  const userId = parseInt(id);
  const user = useSelector(currentUser);
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ["users", userId],
    queryFn: async () => {
      const res = await makeRequest.get(`/users/find/${id}`);
      return res.data;
    },
  });

  const relationQuery = useQuery({
    queryKey: ["relations", id],
    enabled: userId !== user.id,
    queryFn: async () => {
      const res = await makeRequest.get(`/relationships?userId=${id}`);
      return res.data;
    },
  });

  const relationMutation = useMutation({
    mutationFn: (relation) => {
      if (relation)
        return makeRequest.delete(`/relationships?userId=${userId}`);
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      //Invalidate and refetch
      queryClient.invalidateQueries(["relations", id]);
      queryClient.invalidateQueries(["suggestion", user.id]);
    },
  });

  const handleFollow = () => {
    relationMutation.mutate(relationQuery.data.includes(user.id));
  };

  return (
    <div className="profile">
      {userQuery.isError ? (
        <h1>{userQuery.error.message}</h1>
      ) : userQuery.isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="images">
            <img
              src={`/upload/${userQuery.data.cover_pic}`}
              alt=""
              className="cover"
            />
            <img
              src={`/upload/${userQuery.data.profile_pic}`}
              alt=""
              className="profile-img"
            />
          </div>
          <div className="profile__user">
            <div className="profile__user-info">
              <div className="left">
                <a href="https://facebook.com">
                  <FacebookTwoToneIcon fontSize="medium" />
                </a>
                <a href="https://instagram.com">
                  <InstagramIcon fontSize="medium" />
                </a>
                <a href="https://twitter.com">
                  <TwitterIcon fontSize="medium" />
                </a>
                <a href="https://linkedin.com">
                  <LinkedInIcon fontSize="medium" />
                </a>
                <a href="https://pinterest.com/">
                  <PinterestIcon fontSize="medium" />
                </a>
              </div>
              <div className="center">
                <div className="profile__names">
                  <span className="name">{userQuery.data.name}</span>
                  <span className="username">{`@${userQuery.data.username}`}</span>
                </div>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{userQuery.data.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{userQuery.data.website}</span>
                  </div>
                </div>
                {userId === user.id ? (
                  <button onClick={() => setOpenUpdate(true)}>Update</button>
                ) : relationQuery.error ? (
                  relationQuery.error.message
                ) : relationQuery.isLoading ? (
                  "loading"
                ) : (
                  <button onClick={handleFollow}>
                    {relationQuery.data.includes(user.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            {userId === user.id ? (
              <Posts userId={id} />
            ) : (
              relationQuery?.data?.includes(user.id) && <Posts userId={id} />
            )}
          </div>
          {openUpdate && (
            <Update setOpenUpdate={setOpenUpdate} user={userQuery.data} />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
