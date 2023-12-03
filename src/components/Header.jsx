import { Avatar, Box, Button, Flex, Heading, WrapItem } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Appactions } from "./context/Actionprovider";
// import Action from "./Action";

const Header = () => {
  const { bmModelHandler } = useContext(Appactions);
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
          <Avatar name="Monika singh" bg="LightGray" />
        </WrapItem>
      </Box>
    </Flex>
  );
};

export default Header;
