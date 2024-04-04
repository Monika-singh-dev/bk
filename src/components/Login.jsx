import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../Firebase/SDK";
import { AppStore } from "./context/Storeprovider";
import { Button, Input } from "@chakra-ui/react";
import "./forms.css";
function Login() {
  const navigate = useNavigate();
  const { handleUser, user } = useContext(AppStore);
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // alert("");
    e.preventDefault();

    if (data.email.trim() === "" || data.password.trim() === "") {
      alert("plzz fill the all inputs");
    }

    const user = await signIn(data.email, data.password);

    console.log(user);

    if (!user) {
      alert("something went wrong!");
      return;
    }

    handleUser(user);
    localStorage.setItem("bookmarkUser", JSON.stringify(user));

    setData({ email: "", password: "" });
    // window.location.href = "/homepage";
    navigate("/homepage");
    // alert("");
    // console.log("object");
  };

  console.log("login");

  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, [user]);
  return (
    <div className="top">
      <div className="top2">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="input-box">
            <label>Email:</label>
            <Input
              type="email"
              value={data.email}
              onChange={handleChange}
              name="email"
            />
          </div>
          <div className="input-box">
            <label>Password:</label>
            <br />
            <Input
              type="password"
              value={data.password}
              onChange={handleChange}
              name="password"
            />
          </div>
          <br />
          <Button type="submit">login</Button>
          <div className="s-link">
            <p>
              don't have an account ?<a href="/signup">Signup</a>
            </p>
            or
            <p>
              back to
              <a href="/">Dashboard</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
