import React from 'react';
import { Flex, HStack } from '@chakra-ui/react';
import Navigation from './Navigation';
import { Route, Routes } from 'react-router-dom';
import Create from '../Create';
import Pending from '../Pending';
import Categories from '../Categories';

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
        <Routes>
          <Route path="create" element={<Create />}/>
          <Route path="pending" element={<Pending />}/>
          <Route path="categories" element={<Categories />}/>
        </Routes>
      </Flex>
    </HStack>
  );
};

export default Home;