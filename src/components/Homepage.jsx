import React from 'react'
// import { Link } from 'react-router-dom'
import { Button , Link} from "@chakra-ui/react";
const Homepage = () => {
  return (
    <div>
      {/* <button><Link to={"/signup"}>Signup</Link></button> */}
      <Link href="/Signup">
      <Button colorScheme="gray">Signup</Button></Link>
      or
      {/* <button><Link to={"/login"}>Login</Link></button> */}
      <Link href="/login">
      <Button colorScheme="gray">Login</Button></Link>
      <Link href="/header">
      <Button colorScheme="gray">header</Button></Link>
    </div>
  )
}

export default Homepage;
