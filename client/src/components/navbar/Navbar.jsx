import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import User from "../user/User";
import { useDispatch, useSelector } from "react-redux";
import { dark } from "../../redux/themeSlice";
import { toggleTheme } from "../../redux/themeSlice";
import { currentUser, logout } from "../../redux/userSlice";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Navbar = () => {
  const user = useSelector(currentUser);
  const darkMode = useSelector(dark);
  const dispatch = useDispatch();

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  const logoutMutation = useMutation({
    mutationFn: () => {
      makeRequest.post("/auth/logout");
    },
    onSuccess: () => {
      dispatch(logout());
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" className="link">
          <span className="logo">jaysocial</span>
        </Link>
        <HomeOutlinedIcon className="icon" />
        {darkMode ? (
          <WbSunnyOutlinedIcon className="icon" onClick={handleTheme} />
        ) : (
          <DarkModeOutlinedIcon className="icon" onClick={handleTheme} />
        )}
        <GridViewOutlinedIcon className="icon" />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <LogoutOutlinedIcon className="icon" onClick={handleLogout} />
        <EmailOutlinedIcon className="icon" />
        <NotificationsOutlinedIcon className="icon" />
        <User img={"/upload/" + user.profile_pic} name={user.name} />
      </div>
    </div>
  );
};

export default Navbar;
