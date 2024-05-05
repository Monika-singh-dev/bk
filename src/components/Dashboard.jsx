import { Button } from "@chakra-ui/react";
import React from "react";
import "./dashboard.css";
import "./forms.css";
import { GiBookmarklet } from "react-icons/gi";

const Dashboard = () => {
  console.log("dashboard");
  return (
    <div className="top">
      <center>
        <GiBookmarklet className="ico" />
        <h1 className="heading">Save your Bookmarks with us</h1>
        <a href="/login">
          <Button className="buttonstyle">login</Button>
        </a>
        <a href="/signup">
          <Button className="buttonstyle">signup</Button>
        </a>
      </center>
    </div>
  );
};

export default Dashboard;
