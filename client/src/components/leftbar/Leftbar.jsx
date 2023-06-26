import "./leftbar.scss";
import LeftbarItem from "./LeftbarItem";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import User from "../user/User";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/userSlice";
import { Link } from "react-router-dom";

const Leftbar = () => {
  const user = useSelector(currentUser);
  return (
    <div className="leftbar">
      <div className="menu">
        <Link to={`/profile/${user.id}`} className="link">
          <User img={"/upload/" + user.profile_pic} name={user.name} />
        </Link>
        <LeftbarItem img={Friends} title="Friends" />
        <LeftbarItem img={Groups} title="Groups" />
        <LeftbarItem img={Market} title="Marketplace" />
        <LeftbarItem img={Watch} title="Watch" />
        <LeftbarItem img={Memories} title="Memories" />
      </div>
      <hr />
      <div className="menu">
        <span className="menu__title">Your shortcuts</span>
        <LeftbarItem img={Events} title="Events" />
        <LeftbarItem img={Gaming} title="Gaming" />
        <LeftbarItem img={Gallery} title="Gallery" />
        <LeftbarItem img={Videos} title="Videos" />
        <LeftbarItem img={Messages} title="Messages" />
      </div>
      <hr />
      <div className="menu">
        <span className="menu__title">Others</span>
        <LeftbarItem img={Fund} title="Fundraiser" />
        <LeftbarItem img={Tutorials} title="Tutorials" />
        <LeftbarItem img={Courses} title="Courses" />
      </div>
    </div>
  );
};

export default Leftbar;
