import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addUserDB, signUp } from "../Firebase/SDK";
import { AppStore } from "./context/Storeprovider";
import { Button, Input, Link } from "@chakra-ui/react";

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

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div>
      <form onSubmit={submithandle}>
        <h2>Signup Form</h2>
        <div>
          <label>Username:</label>
          <br />
          <Input
            type="text"
            value={data.username}
            onChange={userhandle}
            name="username"
            variant="flushed"
          />
        </div>
        <div>
          <label>E-mail:</label>
          <br />
          <Input
            type="email"
            value={data.email}
            onChange={userhandle}
            name="email"
            variant="flushed"
          />
        </div>
        <div>
          <label>Password:</label>
          <br />
          <Input
            type="password"
            value={data.password}
            onChange={userhandle}
            name="password"
            variant="flushed"
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <br />
          <Input
            type="password"
            value={data.confirm}
            onChange={userhandle}
            name="confirm"
            variant="flushed"
          />
        </div>
        <br />
        <Button
          size="md"
          height="40px"
          width="100px"
          border="2px"
          borderColor="green.500"
          type="submit"
        >
          Sign up
        </Button>
        <p>
          if you have already an account then{" "}
          <Link color="teal.500" href="/login">
            Login
          </Link>
        </p>
        or back to
        <Link color="teal.500" href="/">
          Homepage
        </Link>
      </form>
    </div>
  );
};

export default Signup;
