import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../Firebase/SDK";
import { AppStore } from "./context/Storeprovider";
import { Button, Input, Link } from "@chakra-ui/react";
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
        <h6>Login Form</h6>
        <div>
          <label>Email:</label>
          <br />
          <Input
            type="email"
            value={data.email}
            onChange={handleChange}
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
            onChange={handleChange}
            name="password"
            variant="flushed"
          />
        </div>
        <br />
        <Button
          size="md"
          height="30px"
          width="90px"
          border="2px"
          borderColor="green.500"
          type="submit"
        >
          login
        </Button>
        <p>
          don't have an account then{" "}
          <Link color="teal.500" href="/signup">
            Signup
          </Link>
        </p>
        or
        <p>
          {" "}
          back to{" "}
          <Link color="teal.500" href="/">
            Homepage
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
