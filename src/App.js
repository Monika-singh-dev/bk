import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Login from "./components/Login";

import Bookmarkmodel from "./components/Models/Bookmarkmodel";
import Categorymodel from "./components/Models/Categorymodel";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Homepage} />
          <Route path="/signup" Component={Signup} />
          <Route path="/login" Component={Login} />
        </Routes>
      </BrowserRouter>

      <Bookmarkmodel />
      <Categorymodel />
    </ChakraProvider>
  );
}

export default App;
