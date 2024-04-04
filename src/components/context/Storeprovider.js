import { createContext, useEffect, useState } from "react";
import {
  addBookmarkDB,
  addCategoryDB,
  db,
  getNewBookmarkID,
  getNewCategoryID,
  objName,
  removeBookmarkDB,
  removeCategoryDB,
  renameBookmarkDB,
  renameCategoryDB,
} from "../../Firebase/SDK";
import { onValue, ref } from "firebase/database";

export const AppStore = createContext();

export const StoreProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  // const [categories, setCategories] = useState([]);

  const handleUser = (data) => {
    setUser(data);
    localStorage.setItem("bookmarkUser", data);
  };

  const addcategory = async (value) => {
    const id = await getNewCategoryID();
    addCategoryDB(id, user.uid, value);
    // setCategories([...categories, { id, name: value }]);
    setItems([...items, { id, name: value }]);
  };

  const addBookmark = async (item) => {
    const id = await getNewBookmarkID(user.uid, item);
    await addBookmarkDB(id, user.uid, item);
    // update the items state
    // add bookmark into its relative category
    const newItems = items.map((i) => {
      if (i.id === item.categoryId) {
        return {
          ...i,
          bookmarks: { ...i.bookmarks, [id]: item },
        };
      }
      return i;
    });

    setItems(newItems);
  };

  // remove bookmark
  const removeBookmark = ({ uid, cID, bID }) => {
    removeBookmarkDB({ uid, cID, bID });
    // update the items state
    const newItems = items.map((i) => {
      if (i.id === cID) {
        const newBookmarks = Object.entries(i.bookmarks)
          .filter(([key, value]) => key !== bID)
          .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {});

        return { ...i, bookmarks: newBookmarks };
      }
      return i;
    });

    setItems(newItems);
  };

  // remove category
  const removeCategory = (uid, cID) => {
    removeCategoryDB(uid, cID);
    // update the items state
    const newItems = items.filter((i) => i.id !== cID);
    setItems(newItems);
  };

  // rename bookmark
  const renameBookmark = (userID, categoryID, bookmarkID, newTitle) => {
    renameBookmarkDB(userID, categoryID, bookmarkID, newTitle);

    const newItems = items.map((item) => {
      if (item.id === categoryID) {
        const updatedBookmarks = Object.entries(item.bookmarks).reduce(
          (acc, [key, value]) => {
            acc[key] =
              key === bookmarkID ? { ...value, title: newTitle } : value;
            return acc;
          },
          {}
        );

        return { ...item, bookmarks: updatedBookmarks };
      }

      return item;
    });

    setItems(newItems);
  };

  // rename category
  const renameCategory = (uid, cID, value) => {
    renameCategoryDB(uid, cID, value);
    // update the items state
    const newItems = items.map((i) => {
      if (i.id === cID) {
        return { ...i, name: value };
      }
      return i;
    });

    setItems(newItems);
  };

  // runs on app render
  // find user and set user state

  // runs on user state change
  useEffect(() => {
    if (user) {
      console.log(user.uid);
      onValue(ref(db, `${user?.uid}/${objName}`), (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          setItems([]);
          return;
        }
        const dataArr = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        setItems(dataArr);
      });
    }
  }, [user]);

  return (
    <AppStore.Provider
      value={{
        items,
        addBookmark,
        addcategory,
        removeBookmark,
        renameCategory,
        removeCategory,
        renameBookmark,
        user,
        handleUser,
      }}
    >
      {children}
    </AppStore.Provider>
  );
};
