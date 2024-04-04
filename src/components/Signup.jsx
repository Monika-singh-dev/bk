import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addUserDB, signUp } from "../Firebase/SDK";
import { AppStore } from "./context/Storeprovider";
import { Button, Input, Link } from "@chakra-ui/react";
import "./forms.css";
const Signup = () => {
  const navigate = useNavigate();
  const { user, handleUser } = useContext(AppStore);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const userhandle = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submithandle = async (e) => {
    e.preventDefault();

    if (!data.email) {
      alert("plzz enter the email!");
      return;
    }

    if (data.password !== data.confirm) {
      alert("plzz check the confirm password");
      return;
    }

    const user = await signUp(data.email, data.password);

    if (!user) {
      alert("something went wrong!");
      return;
    }

    handleUser(user);

    // create new entity

    localStorage.setItem("bookmarkUser", JSON.stringify(user));

    await addUserDB(user.uid, user.email);

    navigate("/");

    setData({ username: "", email: "", password: "", confirm: "" });
  };

  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, [user]);
  return (
    <div className="top">
      <div className="top2">
        <form onSubmit={submithandle}>
          <h2>Signup </h2>
          <div className="input-box">
            <label>Username:</label>
            <Input
              type="text"
              value={data.username}
              onChange={userhandle}
              name="username"
            />
          </div>
          <div className="input-box">
            <label>E-mail:</label>
            <Input
              type="email"
              value={data.email}
              onChange={userhandle}
              name="email"
            />
          </div>
          <div className="input-box">
            <label>Password:</label>
            <br />
            <Input
              type="password"
              value={data.password}
              onChange={userhandle}
              name="password"
            />
          </div>
          <div className="input-box">
            <label>Confirm Password:</label>
            <br />
            <Input
              type="password"
              value={data.confirm}
              onChange={userhandle}
              name="confirm"
            />
          </div>
          <br />
          <Button type="submit">Sign up</Button>
          <div className="s-link">
            <p>
              if you have already an account then <a href="/login">Login</a>
            </p>
            <p>
              or back to
              <a href="/">Dashboard</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
