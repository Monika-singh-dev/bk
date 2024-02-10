import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../Firebase/SDK";
import { AppStore } from "./context/Storeprovider";
function Login() {
  const navigate = useNavigate();
  const { handleUser, user } = useContext(AppStore);
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.email.trim() === "" || data.password.trim() === "") {
      alert("plzz fill the all inputs");
    }

    const user = await signIn(data.email, data.password);

    if (!user) {
      alert("something went wrong!");
      return;
    }

    handleUser(user);
    localStorage.setItem("bookmarkUser", JSON.stringify(user));
    navigate("/");

    setData({ email: "", password: "" });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>
          <i>Login</i>
        </h2>
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={data.email}
            onChange={handleChange}
            name="email"
          />
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={data.password}
            onChange={handleChange}
            name="password"
          />
        </div>
        <br />
        <button type="submit">login</button>
        <p>
          don't have an account then <Link to={"/signup"}>Signup</Link>
        </p>
        or back to<Link to={"/"}>Homepage</Link>
      </form>
    </div>
  );
}

export default Login;
