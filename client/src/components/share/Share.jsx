import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { currentUser } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import ShareItem from "./item/ShareItem";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const user = useSelector(currentUser);
  const queryClient = useQueryClient();

  const newPostMutation = useMutation({
    mutationFn: (newPost) => makeRequest.post("/posts", newPost),
    onSuccess: () => {
      //Invalidate and refetch
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    newPostMutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="top">
        <div className="left">
          <img src={"/upload/" + user.profile_pic} alt="user avatar" />
          <input
            type="text"
            placeholder={`What's on your mind, ${user.name}?`}
            value={desc}
            name="desc"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </div>
        <div className="right">
          {file && (
            <img className="file" alt="" src={URL.createObjectURL(file)} />
          )}
        </div>
      </div>
      <hr />
      <div className="bottom">
        <div className="left">
          <input
            type="file"
            id="file"
            className="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file">
            <ShareItem img={Image} title="Add Image" />
          </label>
          <ShareItem img={Map} title="Add Location" />
          <ShareItem img={Friend} title="Tag Friends" />
        </div>
        <div className="right">
          <button type="submit" onClick={handleSubmit}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
