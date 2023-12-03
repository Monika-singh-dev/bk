import React, { useState } from "react";
import { Link } from "react-router-dom";
const Signup = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const userhandle = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submithandle = (e) => {
    e.preventDefault();

    if(data.password !== data.confirm)
    {
        alert("plzz check the confirm password");
        return;
    }
    console.log(data)
    setData({username:'',email:"",password:"",confirm:""});
  };
  return (
    <div>
      <form onSubmit={submithandle}>
        <h2>Signup</h2>
        <div>
          <label>Username:</label><br/>
          <input
            type="text"
            value={data.username}
            onChange={userhandle}
            name="username"
          />
        </div>
        <div>
          <label>E-mail:</label><br/>
          <input
            type="email"
            value={data.email}
            onChange={userhandle}
            name="email"
          />
        </div>
        <div>
          <label>Password:</label><br/>
          <input
            type="password"
            value={data.password}
            onChange={userhandle}
            name="password"
          />
        </div>
        <div>
          <label>Confirm Password:</label><br/>
          <input
            type="password"
            value={data.confirm}
            onChange={userhandle}
            name="confirm"
          />
        </div><br/>

        <input type="submit" value="signup" />
        <p>if you have an accountthen <Link to={"/login"}>Login</Link></p>or back to<Link to={"/"}>Homepage</Link>
      </form>
      
    </div>
  );
};

export default Signup;
