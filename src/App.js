import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Bookmarkmodel from "./components/Models/Bookmarkmodel";
import Categorymodel from "./components/Models/Categorymodel";
import Dashboard from "./components/Dashboard";

function App() {
  console.log("app");
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={Dashboard} />
          <Route path="/signup" Component={Signup} />
          <Route path="/login" Component={Login} />
          <Route path="/homepage" Component={Homepage} />
        </Routes>
      </BrowserRouter>

      <Bookmarkmodel />
      <Categorymodel />
    </ChakraProvider>
  );
}

export default App;
