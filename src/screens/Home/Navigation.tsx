import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import {
  Center,
  VStack,
  Image,
  List,
  ListItem,
  Link,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Box,
} from "@chakra-ui/react";
import useRouteMatchValue from "../../hooks/useRouteMatchValue";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { removeAuthToken } from "../../store/loginSlice";
import {
  faUser,
  faPlus,
  faCalendar,
  faThList,
  faSignOut,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(removeAuthToken());
    navigate("/login");
  };

  const handleResetRoutes = () => {
    // reset routes
  };

  return (
    <VStack justify="space-between" backgroundColor="app.primary">
      <VStack spacing="0" justify="space-between" h="full" mb="10px">
        <VStack>
          <Center h="full" w="214px" mt="41px" mb="33px" as="h1">
            <Image
            //src={logo}
            />
          </Center>
          <List w="full">
            <ListItem onClick={handleResetRoutes}>
              <Link as={RouterLink} to={"profile"} _hover={{style: 'none'}}>
                <HStack
                  h="12"
                  pl="8"
                  bg={useRouteMatchValue({ path: "/home/profile" }, [
                    "app.accent",
                    "transparent",
                  ])}
                >
                  <Box h="5" w="5" mb="2px">
                    <FontAwesomeIcon icon={faUser} color="gray" />
                  </Box>
                  <Text
                    color="white"
                    fontWeight="semibold"
                    fontSize="18"
                    fontFamily="heading"
                  >
                    Profile
                  </Text>
                </HStack>
              </Link>
            </ListItem>
            <ListItem onClick={handleResetRoutes}>
              <Link as={RouterLink} to={"create"} _hover={{style: 'none'}}>
                <HStack
                  h="12"
                  pl="8"
                  bg={useRouteMatchValue({ path: "/home/create" }, [
                    "app.accent",
                    "transparent",
                  ])}
                >
                  <Box h="5" w="5" mb="2px">
                    <FontAwesomeIcon icon={faPlus} color="gray" />
                  </Box>
                  <Text
                    color="white"
                    fontWeight="semibold"
                    fontSize="18"
                    fontFamily="heading"
                  >
                    Create Event
                  </Text>
                </HStack>
              </Link>
            </ListItem>
            <ListItem onClick={handleResetRoutes}>
              <Link as={RouterLink} to={"events"} _hover={{style: 'none'}}>
                <HStack
                  h="12"
                  pl="8"
                  bg={useRouteMatchValue({ path: "/home/events" }, [
                    "app.accent",
                    "transparent",
                  ])}
                >
                  <Box h="5" w="5" mb="4px">
                    <FontAwesomeIcon icon={faCalendar} color="gray" />
                  </Box>
                  <Text
                    color="white"
                    fontWeight="semibold"
                    fontSize="18"
                    fontFamily="heading"
                  >
                    Events
                  </Text>
                </HStack>
              </Link>
            </ListItem>
            <ListItem onClick={handleResetRoutes}>
              <Link as={RouterLink} to={"categories"} _hover={{style: 'none'}}>
                <HStack
                  h="12"
                  pl="8"
                  bg={useRouteMatchValue({ path: "/home/categories" }, [
                    "app.accent",
                    "transparent",
                  ])}
                >
                  <Box h="5" w="5" mb="2px">
                    <FontAwesomeIcon icon={faThList} color="gray" />
                  </Box>
                  <Text
                    color="white"
                    fontWeight="semibold"
                    fontSize="18"
                    fontFamily="heading"
                  >
                    Categories
                  </Text>
                </HStack>
              </Link>
            </ListItem>
            <ListItem onClick={handleResetRoutes}>
              <Link as={RouterLink} to={"history"} _hover={{style: 'none'}}>
                <HStack
                  h="12"
                  pl="8"
                  bg={useRouteMatchValue({ path: "/home/history" }, [
                    "app.accent",
                    "transparent",
                  ])}
                >
                  <Box h="5" w="5" mb="2px">
                    <FontAwesomeIcon icon={faClock} color="gray" />
                  </Box>
                  <Text
                    color="white"
                    fontWeight="semibold"
                    fontSize="18"
                    fontFamily="heading"
                  >
                    Event History
                  </Text>
                </HStack>
              </Link>
            </ListItem>
          </List>
        </VStack>
        <HStack w="full">
          <HStack h="12" pl="8" _hover={{ cursor: "pointer" }}>
            <Box h="5" w="5" mb="4px">
              <FontAwesomeIcon icon={faSignOut} color="gray" />
            </Box>
            <Text
              color="white"
              fontWeight="semibold"
              fontSize="18"
              fontFamily="heading"
              onClick={handleLogout}
            >
              Logout
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Navigation;
