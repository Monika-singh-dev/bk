import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Input,
  List,
  ListItem,
  Spacer,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import {
  removeBookmarkDB,
  removeCategoryDB,
  renameCategoryDB,
} from "../Firebase/SDK";
import { IoMdDoneAll } from "react-icons/io";

const CardBox = ({ item }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [ctName, setCtName] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (!item.bookmarks) return;

    const dataArr = Object.keys(item?.bookmarks).map((key) => ({
      ...item.bookmarks[key],
      id: key,
    }));

    setBookmarks(dataArr);
  }, [item]);

  if (!item.bookmarks) return;

  const removeBookmark = (id) => {
    removeBookmarkDB({ cID: item.id, bID: id });
  };

  const renameCategory = (id) => {
    renameCategoryDB(item.id, ctName);
    setIsEdit(false);
  };

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
          <Heading size="sm">{item.name}</Heading>
        )}

        <Box display={"flex"} alignItems={"center"}>
          {isEdit ? (
            <Box mr={2} ml={2} cursor={"pointer"} fontSize={"18px"}>
              <IoMdDoneAll onClick={renameCategory} />
            </Box>
          ) : (
            <>
              <CiEdit
                fontSize={"22px"}
                onClick={() => {
                  setIsEdit(true);
                  setCtName(item.name);
                }}
              />
              <Box mr={2} ml={2} cursor={"pointer"} fontSize={"18px"}>
                <MdDelete onClick={() => removeCategoryDB(item.id)} />
              </Box>
            </>
          )}
        </Box>
      </CardHeader>

      <CardBody p={0}>
        <List spacing={3}>
          {bookmarks.map((bookmark, i) => (
            <SingleBookmark
              key={i}
              bookmark={bookmark}
              removeBookmark={removeBookmark}
            />
          ))}
        </List>
      </CardBody>
    </Card>
  );
};

const SingleBookmark = ({ bookmark, removeBookmark }) => {
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
      <Box w={"12px"} mr={2} ml={2} mt={0.5}>
        <img src={bookmark.icon} alt="icon" height={"100%"} width={"100%"} />
      </Box>
      {bookmark.title}
      <Spacer />
      <Box
        mr={2}
        ml={2}
        cursor={"pointer"}
        onClick={() => removeBookmark(bookmark.id)}
      >
        <MdDelete />
      </Box>
    </ListItem>
  );
};

export default CardBox;
