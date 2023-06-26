import "./update.scss";
import CloseIcon from "@mui/icons-material/Close";
import Friend from "../../assets/friend.png";
import Image from "../../assets/map.png";
import { useState } from "react";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Update = ({ setOpenUpdate, user }) => {
  const queryClient = useQueryClient();
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [input, setInput] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    city: user.city || "",
    website: user.website || "",
  });

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const updateMutation = useMutation({
    mutationFn: (user) => makeRequest.put("/users", user),
    onSuccess: () => {
      //Invalidate and refetch
      queryClient.invalidateQueries(["users", user.id]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profile_pic = user.profile_pic;
    let cover_pic = user.cover_pic;
    if (profile) profile_pic = await upload(profile);
    if (cover) cover_pic = await upload(cover);
    updateMutation.mutate({ ...input, profile_pic, cover_pic });
    setOpenUpdate(false);
  };

  return (
    <div className="update">
      <div className="update__content">
        <form className="update__form">
          <input
            type="file"
            className="file"
            id="profile"
            onChange={(e) => setProfile(e.target.files[0])}
          />
          <label htmlFor="profile">
            <div className="update__item">
              <img src={Friend} alt="" />
              <span>Profile Picture</span>
            </div>
          </label>
          <input
            type="file"
            className="file"
            id="cover"
            onChange={(e) => setCover(e.target.files[0])}
          />
          <label htmlFor="cover">
            <div className="update__item">
              <img src={Image} alt="" />
              <span>Cover Picture</span>
            </div>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={input.username}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={input.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={input.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="website"
            placeholder="Your Website"
            value={input.website}
            onChange={handleChange}
          />
          <button type="submit" onClick={handleSubmit}>
            Update
          </button>
        </form>
        <div
          className="update__form-close"
          onClick={() => setOpenUpdate(false)}
        >
          <CloseIcon />
        </div>
      </div>
    </div>
  );
};

export default Update;
