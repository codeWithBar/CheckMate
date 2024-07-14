import { HStack, Image, Link as ChakraLink, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack justifyContent={"space-between"}>
      <Image src={logo} boxSize={"60px"} />
      <ChakraLink as={ReactRouterLink} to={"/easyengine"}>
        EasyEngine!!
      </ChakraLink>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
