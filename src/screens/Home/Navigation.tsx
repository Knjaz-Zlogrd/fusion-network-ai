import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { Center, VStack, Image, List, ListItem, Link, HStack, Text, Menu, MenuButton, MenuList, MenuItem, } from '@chakra-ui/react';
import useRouteMatchValue from '../../hooks/useRouteMatchValue';

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // logout logic
  }

  const handleResetRoutes = () => {
    // reset routes
  };

  return (
    <VStack 
      justify="space-between"
      backgroundColor="app.darkBlue">
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
                to={"users"}>
                  <HStack h="12" pl="8" bg={useRouteMatchValue({path: "/home/users"}, ['app.blue', 'transparent'])}>
                    {/* <NavIcon h="5" w="5" mr="2"/> */}
                    <Text color="white" fontWeight="semibold" fontSize="18" fontFamily="heading">Users</Text>
                  </HStack>
              </Link>
            </ListItem>
            <ListItem onClick={handleResetRoutes}>
              <Link
                as={RouterLink}
                to={"hangouts"}>
                  <HStack h="12" pl="8" bg={useRouteMatchValue({path: "/home/hangouts"}, ['app.blue', 'transparent'])}>
                    {/* <NavIcon h="5" w="5" mr="2" /> */}
                    <Text color="white" fontWeight="semibold" fontSize="18" fontFamily="heading">Hangouts</Text>
                  </HStack>
              </Link> 
            </ListItem>
            <ListItem onClick={handleResetRoutes}>
              <Link 
                as={RouterLink}
                to={"reports"}>
                  <HStack h="12" pl="8" bg={useRouteMatchValue({path: "/home/reports"}, ['app.blue', 'transparent'])}>
                    {/* <NavIcon h="5" w="5" mr="2" /> */}
                    <Text color="white" fontWeight="semibold" fontSize="18" fontFamily="heading">Reports</Text>
                  </HStack>
              </Link>
            </ListItem>
          </List>
        </VStack>
        <HStack w="full">
          <Menu>
            <MenuButton  
              aria-label='Settings'
              alignSelf='flex-end'
              _hover={{color: 'none'}}
              _active={{color: 'none'}}
            >
              <HStack h="12" pl="8">
                {/* <SettingsIcon h="5" w="5" mr="2" /> */}
                <Text color="white" fontWeight="semibold" fontSize="18" fontFamily="heading">Settings</Text>
              </HStack>
            </MenuButton>
            <MenuList minW="180px" ml="4">
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Navigation;