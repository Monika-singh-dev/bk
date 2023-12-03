// import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ChakraProvider, Flex } from "@chakra-ui/react";
// import Homepage from "./components/Homepage";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
import Header from "./components/Header";
import CardBox from "./components/CardBox";

import Bookmarkmodel from "./components/Models/Bookmarkmodel";
import Categorymodel from "./components/Models/Categorymodel";
import { useContext } from "react";
import { AppStore } from "./components/context/Storeprovider";

function App() {
  const { items } = useContext(AppStore);

  return (
    <ChakraProvider>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" Component={Homepage} />
          <Route path="/signup" Component={Signup} />
          <Route path="/login" Component={Login} />
          <Route path="/header" Component={Header} />
        </Routes>
      </BrowserRouter> */}
      <Header />
      <Flex flexWrap={"wrap"}>
        {items.map((item, i) => (
          <CardBox key={i} item={item} />
        ))}
      </Flex>
      <Bookmarkmodel />
      <Categorymodel />
    </ChakraProvider>
  );
}

export default App;
