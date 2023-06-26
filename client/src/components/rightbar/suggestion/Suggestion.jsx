import "./suggestion.scss";
import User from "../../user/User";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import { useSelector } from "react-redux";
import { currentUser } from "../../../redux/userSlice";
import { Link } from "react-router-dom";

const Suggestion = ({ id, img, name }) => {
  const user = useSelector(currentUser);
  const queryClient = useQueryClient();

  const relationMutation = useMutation({
    mutationFn: (userId) => {
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      //Invalidating and refetching posts
      queryClient.invalidateQueries(["posts"]);

      //filtering the old data instead of refetching the new one
      queryClient.setQueriesData(["suggestion", user.id], (oldData) =>
        oldData.filter((data) => data.id !== id)
      );
    },
  });

  const handleFollow = () => {
    relationMutation.mutate(id);
  };

  return (
    <div className="suggestion">
      <Link to={`/profile/${id}`} className="link">
        <User img={img} name={name} />
      </Link>
      <div className="buttons">
        <button onClick={handleFollow}>Follow</button>
        <button>Dismiss</button>
      </div>
    </div>
  );
};

export default Suggestion;
