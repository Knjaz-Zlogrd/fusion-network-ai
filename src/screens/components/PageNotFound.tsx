import React from "react";
import { Button, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";

const PageNotFound = () => {
  const navigate = useNavigate();
  const authToken = useAppSelector((state) => state.loginSlice.authToken);

  const handleBackToHomeButton = () => {
    if (authToken) {
      navigate('/home/create');
    } else {
      navigate('/login');
    }
  };

  return (
    <VStack>
      <Text fontWeight="bold" fontSize="40">
        Error 404
      </Text>
      <Text fontWeight="bold" fontSize="40" pb="4">
        Page not found!
      </Text>
      <Button onClick={handleBackToHomeButton}>
        {authToken ? 'Back to home' : 'Back to login'}
      </Button>
    </VStack>
  );
};

export default PageNotFound;