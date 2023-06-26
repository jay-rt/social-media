import "./rightbar.scss";
import Suggestion from "./suggestion/Suggestion";
import Activity from "./activity/Activity";
import User from "../user/User";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/userSlice";
import { makeRequest } from "../../axios";

const Rightbar = () => {
  const user = useSelector(currentUser);
  const { isLoading, error, data } = useQuery({
    queryKey: ["suggestion", user.id],
    queryFn: async () => {
      const res = await makeRequest.get("/users/suggestions");
      return res.data;
    },
  });

  return (
    <div className="rightbar">
      <div className="suggestions">
        <span className="title">Suggestions for you</span>
        {error ? (
          <p className="msg">{error.message}</p>
        ) : isLoading ? (
          <p className="msg">Loading...</p>
        ) : data.length === 0 ? (
          <p className="msg">No suggestions at the moment</p>
        ) : (
          data.map((sug) => (
            <Suggestion
              id={sug.id}
              img={`/upload/${sug.profile_pic}`}
              name={sug.name}
              key={sug.id}
            />
          ))
        )}
      </div>

      <div className="activities">
        <span className="title">Latest Activities</span>
        <Activity
          img="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
          name="John Doe"
        />
        <Activity
          img="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
          name="John Doe"
        />
      </div>

      <div className="online-friends">
        <span className="title">Online Friends</span>
        <User
          img="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
          name="John Doe"
          online
        />
        <User
          img="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
          name="John Doe"
          online
        />
        <User
          img="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
          name="John Doe"
          online
        />
        <User
          img="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
          name="John Doe"
          online
        />
        <User
          img="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
          name="John Doe"
          online
        />
        <User
          img="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
          name="John Doe"
          online
        />
      </div>
    </div>
  );
};

export default Rightbar;
