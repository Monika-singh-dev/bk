import { createContext, useEffect, useState } from "react";
import { addCategoryDB, db, objName } from "../../Firebase/SDK";
import { onValue, ref } from "firebase/database";

export const AppStore = createContext();

export const StoreProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  // const [categories, setCategories] = useState([]);

  const addcategory = (value) => {
    addCategoryDB(value);
    // setCategories([...categories, { id, name: value }]);
  };

  // console.log(categories);
  const addBookmark = (value) => {
    // const id = addBookmarkDB(value);
    addCategoryDB(value);
    // setItems([...items, { id, ...value }]);
  };

  // const addItems = (value) => {
  //   setItems([...items, value]);
  // };
  useEffect(() => {
    onValue(ref(db, objName), (snapshot) => {
      const data = snapshot.val();
      const dataArr = Object.keys(data).map((key) => ({
        ...data[key],
        id: key,
      }));
      setItems(dataArr);
    });
  }, []);

  return (
    <AppStore.Provider value={{ items, addBookmark, addcategory }}>
      {children}
    </AppStore.Provider>
  );
};
