import { Avatar, Box, Button, Flex, Heading, WrapItem } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Appactions } from "./context/Actionprovider";
import { AppStore } from "./context/Storeprovider";

const Header = () => {
  const { bmModelHandler } = useContext(Appactions);
  const { handleUser } = useContext(AppStore);

  const handleLogOut = () => {
    if (window.confirm(`Do you want to logout?`) !== true) return;
    handleUser(null);
  };

  return (
    <Flex
      justifyContent="space-between"
      p={2}
      boxShadow="base"
      alignItems="center"
      bgColor="#6a5ee6"
      userSelect="none"
    >
      <Heading as="h3" size="md" color="white" cursor={"pointer"}>
        Bookmarks
      </Heading>

      <Box display="flex" alignItems={"center"} gap="10px">
        <Button
          variant={"outline"}
          color={"black"}
          bg={"white"}
          onClick={bmModelHandler}
        >
          + Add
        </Button>

        <WrapItem cursor={"pointer"}>
          <Button
            variant={"outline"}
            color={"black"}
            bg={"white"}
            onClick={handleLogOut}
          >
            Log Out
          </Button>
          {/* <Avatar
            name="Monika Singh"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            bg="green"
            border={"2px solid black"}
          /> */}
        </WrapItem>
      </Box>
    </Flex>
  );
};

export default Header;
