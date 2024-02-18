import React, { useState } from 'react';
import { Center, Flex, Stack, VStack, Text, Input, Button, Image, } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { signInWithEmailAndPassword, } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { addAuthToken } from '../../store/loginSlice';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);

  const handleLogin = async() => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      const token = await user.user.getIdToken();
      
      if (token) {   
        dispatch(addAuthToken(token));
        navigate('/home/create');
        setLoginFailed(false);
      } else {
        setLoginFailed(true);
      }
    } catch (error) {
      console.log('Unable to login.', error); 
      setLoginFailed(true);
    }
  }

  return (
    <Stack 
      h="100vh" 
      bgRepeat="no-repeat" 
      bgPosition="center"
    >
    <Center>
      <VStack w="400px" h="327px" background="white" position="absolute" top="30%" borderWidth="1px" borderColor="black" >
        <Flex align="center" h="100px">
          <Text fontSize="26" fontWeight="semibold" mt="12px" color="black">Sign in</Text>
        </Flex>
        <Stack as="form" w="70%" spacing="2.5" >
          <Input 
            textColor="black" 
            placeholder="Enter email"
            _placeholder={{color: "black"}}
            bgColor="gray.200"
            value={loginEmail}
            onChange={(event) => setLoginEmail(event.target.value)}
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
            textColor="black"
            placeholder="Enter password"
            _placeholder={{color: 'black'}} 
            bgColor="gray.200"
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
          />
          <Text 
            color={loginFailed ? "red" : 'transparent'} 
            fontSize="12"
            userSelect="none">
              Incorrect username or password
          </Text>
          <Button 
            bgColor="blue.600"
            _hover={{bgColor: 'app.primary'}}
            color="white" 
            onClick={handleLogin}
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