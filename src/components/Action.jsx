import {
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
  } from "@chakra-ui/react";
  import React, { useContext } from "react";
  import { IoAddCircle } from "react-icons/io5";
  import { MdAttachFile } from "react-icons/md";
  import { GiHamburgerMenu } from "react-icons/gi";
import { Appactions } from "./context/Actionprovider";
  
  const Action = () => {
    const {bmModelHandler} = useContext(Appactions);
 
    const {cmModelHandler} = useContext(Appactions);

    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<GiHamburgerMenu />}
          variant="outline"
        />
        <MenuList>
          <MenuItem icon={<IoAddCircle />}onClick={bmModelHandler}>Add Bookmark</MenuItem>
          <MenuItem icon={<MdAttachFile />}onClick={cmModelHandler}>Add Category</MenuItem>
        </MenuList>
      </Menu>
    );
  };
  
  export default Action;