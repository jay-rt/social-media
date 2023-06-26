import "./login.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../redux/userSlice";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const loginMutation = useMutation({
    mutationFn: async (user) => {
      const res = await makeRequest.post("/auth/login", user);
      return res.data;
    },
    onSuccess: (data) => {
      const { id, name, profile_pic, ...others } = data;
      dispatch(login({ id, name, profile_pic }));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(user);
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <span>Don’t you have an account yet?</span>
          <Link to="/register">
            <button type="submit" className="btn">
              Register
            </button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            {loginMutation.isError && (
              <span className="error">{loginMutation.error.response.data}</span>
            )}
            <button type="submit" className="btn" onClick={handleSubmit}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
