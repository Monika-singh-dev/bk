import { Button } from "@chakra-ui/react";
import React from "react";
import "./style.css";
import "./forms.css";
import { GiBookmarklet } from "react-icons/gi";

const Dashboard = () => {
  console.log("dashboard");
  return (
    <div className="top">
      <center>
        <GiBookmarklet className="icon" />
        <h1>Save your Bookmarks with us</h1>
        <a href="/login">
          <Button className="b">login</Button>
        </a>
        <a href="/signup">
          <Button className="b">signup</Button>
        </a>
      </center>
    </div>
  );
};

export default Dashboard;
