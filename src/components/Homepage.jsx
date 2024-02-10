import React, { useContext, useEffect } from "react";
// import { Link } from 'react-router-dom'
import { Button, Flex } from "@chakra-ui/react";
import { AppStore } from "./context/Storeprovider";
import Header from "./Header";
import CardBox from "./CardBox";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const { items, user } = useContext(AppStore);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Header />
      <Flex flexWrap={"wrap"}>
        {items.map((item, i) => (
          <CardBox key={i} item={item} />
        ))}
      </Flex>
    </div>
  );
};

export default Homepage;
