import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Input,
  List,
  ListItem,
  Text,
  Link,
  Spacer,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import React, { useEffect, useState, useContext } from "react";
import { CiEdit } from "react-icons/ci";

import { IoMdDoneAll } from "react-icons/io";
import { AppStore } from "./context/Storeprovider";

const CardBox = ({ item, user }) => {
  const { removeBookmark, removeCategory, renameCategory } =
    useContext(AppStore);
  const [bookmarks, setBookmarks] = useState([]);
  const [ctName, setCtName] = useState(item.name);
  const [isEdit, setIsEdit] = useState(false);

  const removeBkHandler = (id) => {
    removeBookmark({ uid: user.uid, cID: item.id, bID: id });
  };

  const removeCtHandler = () => {
    if (
      window.confirm(
        `Do you want to delete ${item.name} category! All bookmarks of this category will be deleted.`
      ) !== true
    )
      return;

    removeCategory(user.uid, item.id);
    // console.log(item.id);
  };

  useEffect(() => {
    if (!item.bookmarks) return;

    const dataArr = Object.keys(item?.bookmarks).map((key) => ({
      ...item.bookmarks[key],
      id: key,
    }));

    setBookmarks(dataArr);
  }, [item]);

  const renameCtHandler = () => {
    renameCategory(user.uid, item.id, ctName);

    setIsEdit(false);
  };

  if (!item.bookmarks) return;

  return (
    <Card m={"2"} rounded={4} overflow={"hidden"} minW={300} maxW={350}>
      <CardHeader
        p={1}
        display={"flex"}
        justifyContent={"space-between"}
        bgColor={"black"}
        color={"white"}
        rounded={"4px"}
      >
        {isEdit ? (
          <Input
            variant="flushed"
            value={ctName}
            onChange={(e) => setCtName(e.target.value)}
            placeholder="Please type new name!"
          />
        ) : (
          <Heading size={"sm"} ml={1}>
            {item.name}
          </Heading>
        )}

        <Box display={"flex"} alignItems={"center"}>
          {isEdit ? (
            <IoMdDoneAll
              style={{
                marginLeft: "10px",
                marginRight: "8px",
                color: "#f46a31",
              }}
              fontSize={"20px"}
              onClick={renameCtHandler}
            />
          ) : (
            <>
              <CiEdit fontSize={"22px"} onClick={() => setIsEdit(true)} />
              <MdDelete
                style={{ marginLeft: "5px", color: "#f46a31" }}
                fontSize={"20px"}
                onClick={removeCtHandler}
              />
            </>
          )}
        </Box>
      </CardHeader>

      <CardBody p={0}>
        <List spacing={3}>
          {bookmarks.map((bookmark, i) => (
            <SingleBookmark
              key={i}
              userId={user.uid}
              categoryId={item.id}
              bookmark={bookmark}
              removeBkHandler={removeBkHandler}
            />
          ))}
        </List>
      </CardBody>
    </Card>
  );
};

const SingleBookmark = ({ userId, categoryId, bookmark, removeBkHandler }) => {
  const { renameBookmark } = useContext(AppStore);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(bookmark?.title);

  const renameBkHandler = () => {
    renameBookmark(userId, title, categoryId, bookmark.id);
    setIsEdit(false);
  };

  console.log("single bookmark");

  return (
    <ListItem
      style={{
        marginTop: "0px",
        borderBottom: "1px solid lightgray",
        padding: 2,
      }}
      display={"flex"}
      alignItems={"center"}
    >
      {isEdit ? (
        <>
          <Input
            variant="flushed"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Please type new name!"
            zIndex={10}
            borderBottom="2px solid black"
          />

          <IoMdDoneAll
            style={{
              marginLeft: "10px",
              marginRight: "8px",
              color: "#f46a31",
            }}
            fontSize={"20px"}
            onClick={renameBkHandler}
          />
        </>
      ) : (
        <>
          <Link
            href={bookmark.url}
            isExternal
            flex={1}
            display={"flex"}
            alignItems={"center"}
            style={{ textDecoration: "none" }}
          >
            <Box w={"12px"} mr={2} ml={2} mt={0.5}>
              <img
                src={bookmark.icon}
                alt="icon"
                height={"100%"}
                width={"100%"}
              />
            </Box>

            <Text fontSize={"sm"}>{bookmark.title}</Text>

            <Spacer />
          </Link>
          <CiEdit fontSize={"18px"} onClick={() => setIsEdit(true)} />
          <Box
            mr={2}
            ml={2}
            cursor={"pointer"}
            onClick={() => removeBkHandler(bookmark.id)}
          >
            <MdDelete />
          </Box>{" "}
        </>
      )}
    </ListItem>
  );
};

export default CardBox;
