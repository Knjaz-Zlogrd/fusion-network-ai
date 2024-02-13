import React from 'react';
import { Flex, HStack } from '@chakra-ui/react';
import Navigation from './Navigation';

const Home = () => {
  return (
    <HStack 
      h="100vh" 
      w="full"
      minW="1100px" 
      spacing="0" 
      align="stretch" 
      overflow="auto"
    >
      <Flex as="nav" justify="center">
        <Navigation />
      </Flex>
      <Flex as="main" flex="1">
        {/* <Routes>
          <Route path="users" element={<Users />}/>
          <Route path="hangouts" element={<Hangouts />}/>
          <Route path="reports" element={<Reports />}/>
        </Routes> */}
      </Flex>
    </HStack>
  );
};

export default Home;