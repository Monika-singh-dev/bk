import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Login () {
  const [data, setData] = useState({username: "",password:""});
 
  const handleUsernameChange = (e) => {
    setData({...data, [e.target.name]:e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.username.trim() === '' ||  data.password.trim() === '') {
     alert('plzz fill the all inputs');
    } 
    
    console.log(data)
      setData({username:"",password:""})
    
  };
    return (
      <div>
        <form onSubmit={handleSubmit}>
        <h2><i>Login</i></h2>
          <div>
            <label>Username:</label><br/>
            <input
              type="text"
              value={data.username}
              onChange={handleUsernameChange}
              name='username'
            />
          </div>
          <div>
            <label>Password:</label><br/>
            <input
              type="password"
              value={data.password}
              onChange={handleUsernameChange}
              name='password'
            />
          </div><br/>
          <button type='submit'>login</button>
          <p>don't have an account then <Link to={"/signup"}>Signup</Link></p>or back to<Link to={"/"}>Homepage</Link>
        </form>
      </div>
    );
}


export default Login;
