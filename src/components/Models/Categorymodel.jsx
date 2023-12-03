import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Appactions } from "../context/Actionprovider";
import { AppStore } from "../context/Storeprovider";
function Categorymodel() {
  const { isCmOpen, cmModelHandler } = useContext(Appactions);
  const { addcategory } = useContext(AppStore);
  const [input, setInput] = useState("");

  const inputhandler = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      alert("plzz fill the all inputs");
      return;
    }

    addcategory(input);

    setInput("");
    cmModelHandler();
  };
  return (
    <>
      <Modal isOpen={isCmOpen} onClose={cmModelHandler}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={input}
              onChange={inputhandler}
              name="input"
              variant="flushed"
              placeholder="Enter the Category name"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              submit
            </Button>
            <Button colorScheme="blue" mr={3} onClick={cmModelHandler}>
              close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Categorymodel;
