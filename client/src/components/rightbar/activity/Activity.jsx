import "./activity.scss";
import User from "../../user/User";

const Activity = ({ img, name }) => {
  return (
    <div className="activity">
      <User img={img} name={name} paragraph />
      <span>1 min ago</span>
    </div>
  );
};

export default Activity;
