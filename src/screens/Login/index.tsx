import React from 'react';
import { Center, Flex, Stack, VStack, Text, Input, Button, Image, } from '@chakra-ui/react';

const Login = () => {
  return (
    <Stack 
      h="100vh" 
      bgRepeat="no-repeat" 
      bgPosition="center" 
      bgSize="cover"
      // bgImage={`url(${background})`}
    >
    <Center>
      <Image h="56px" w="269px" position="absolute" top="20%" />
      <VStack w="400px" h="327px" background="login.background" position="absolute" top="30%">
        <Flex align="center" h="100px">
          <Text fontSize="26" fontWeight="semibold" mt="12px" color="white">Sign in</Text>
        </Flex>
        <Stack as="form" w="70%" spacing="2.5" >
          <Input 
            textColor="white" 
            placeholder="Enter email"
            _placeholder={{color: "white"}}
            bgColor="login.background"
            // value={loginEmail}
            // onChange={(event) => setLoginEmail(event.target.value)}
          />
          <Text 
            color={'transparent'} 
            fontSize='1'
            userSelect="none">
              Wrong email
          </Text>
          <Input 
            type="password" 
            name="password" 
            textColor="white"
            placeholder="Enter password"
            _placeholder={{color: 'white'}} 
            bgColor="login.background"
            // value={loginPassword}
            // onChange={(event) => setLoginPassword(event.target.value)}
          />
          <Text 
            // color={loginFailed ? "login.authFailed" : 'transparent'} 
            fontSize="12"
            userSelect="none">
              Incorrect username or password
          </Text>
          <Button 
            bgColor="login.buttonBackground"
            _hover={{
              bgColor: 'login.buttonHoverBg'
            }}
            color="white" 
            // onClick={handleLogin}
          >
              Sign in
          </Button>
        </Stack>
      </VStack>
    </Center>
  </Stack>
  );
}

export default Login;