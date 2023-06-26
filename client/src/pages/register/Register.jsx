import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Register = () => {
  const [input, setInput] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    input.confirmPassword !== "" &&
      input.confirmPassword !== input.password &&
      setError("Password doesn't match.");
    input.confirmPassword === input.password && setError(null);
  }, [input.password, input.confirmPassword]);

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const registerMutation = useMutation({
    mutationFn: (input) => {
      makeRequest.post("/auth/register", input);
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  const handleClick = async (e) => {
    if (formRef.current.checkValidity()) {
      e.preventDefault();
      registerMutation.mutate(input);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Jay Social.</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button type="submit" className="btn">
              Login
            </button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form ref={formRef}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={input.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={input.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={input.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={handleChange}
              required
            />
            {error && <span className="error">{error}</span>}
            <button type="submit" className="btn" onClick={handleClick}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
