import "./layout.scss";
import Navbar from "../components/navbar/Navbar";
import Leftbar from "../components/leftbar/Leftbar";
import Rightbar from "../components/rightbar/Rightbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { dark } from "../redux/themeSlice";

const Layout = () => {
  const darkMode = useSelector(dark);
  return (
    <div className={darkMode ? "dark" : "light"}>
      <Navbar />
      <div className="container">
        <Leftbar />
        <main className="main">
          <Outlet />
        </main>
        <Rightbar />
      </div>
    </div>
  );
};

export default Layout;
