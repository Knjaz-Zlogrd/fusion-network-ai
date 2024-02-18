import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { Center, VStack, Image, List, ListItem, Link, HStack, Text, Menu, MenuButton, MenuList, MenuItem, Icon, Box, } from '@chakra-ui/react';
import useRouteMatchValue from '../../hooks/useRouteMatchValue';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { removeAuthToken } from '../../store/loginSlice';
import { faGamepad, faCalendar, faPieChart, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async() => {
    await signOut(auth);
    dispatch(removeAuthToken());
    navigate('/login');
  }

  const handleResetRoutes = () => {
    // reset routes
  };

  return (
    <VStack 
      justify="space-between"
      backgroundColor="app.primary">
      <VStack spacing="0" justify='space-between' h='full' mb="10px">
        <VStack>
          <Center h="full" w="214px" mt="41px" mb="33px" as="h1">
            <Image 
              //src={logo}
            />
          </Center>
          <List w="full">
            <ListItem onClick={handleResetRoutes}>
              <Link 
                as={RouterLink}
                to={"create"}>
                  <HStack h="12" pl="8" bg={useRouteMatchValue({path: "/home/create"}, ['app.blue', 'transparent'])}>
                    <Box h="5" w="5" mb="2px">
                      <FontAwesomeIcon icon={faGamepad} color='gray' />
                    </Box>
                    <Text color="white" fontWeight="semibold" fontSize="18" fontFamily="heading">Create</Text>
                  </HStack>
              </Link>
            </ListItem>
            <ListItem onClick={handleResetRoutes}>
              <Link
                as={RouterLink}
                to={"pending"}>
                  <HStack h="12" pl="8" bg={useRouteMatchValue({path: "/home/pending"}, ['app.blue', 'transparent'])}>
                    <Box h="5" w="5" mb="4px">
                      <FontAwesomeIcon icon={faCalendar} color='gray' />
                    </Box>
                    <Text color="white" fontWeight="semibold" fontSize="18" fontFamily="heading">Pending</Text>
                  </HStack>
              </Link> 
            </ListItem>
            <ListItem onClick={handleResetRoutes}>
              <Link 
                as={RouterLink}
                to={"categories"}>
                  <HStack h="12" pl="8" bg={useRouteMatchValue({path: "/home/categories"}, ['app.blue', 'transparent'])}>
                    <Box h="5" w="5" mb="2px">
                      <FontAwesomeIcon icon={faPieChart} color='gray' />
                    </Box>
                    <Text color="white" fontWeight="semibold" fontSize="18" fontFamily="heading">Categories</Text>
                  </HStack>
              </Link>
            </ListItem>
          </List>
        </VStack>
        <HStack w="full">
          <HStack h="12" pl="8" _hover={{cursor: 'pointer'}}>
            <Box h="5" w="5" mb="4px">
              <FontAwesomeIcon icon={faFolderOpen} color='gray' />
            </Box>
            <Text color="white" fontWeight="semibold" fontSize="18" fontFamily="heading" onClick={handleLogout}>Logout</Text>
           </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Navigation;