import {
  Text,
  Flex,
  VStack,
  HStack,
  Heading,
  Spacer,
  FormControl,
  Textarea,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import Categories from "./Categories";
const Profile = () => {
  return (
    <VStack w="full">
      <Heading as="h2" size="lg" marginY="4">
        User Profile
      </Heading>
      <Flex>
        <VStack flex="24">
          <Heading as="h4" size="sm" marginBottom="4">
            User info
          </Heading>
          <form>
            <Box
              bg="app.accent"
              borderWidth="1px"
              borderRadius="lg"
              borderColor="gray.150"
              mr="32px"
              w="400px"
              h="700px"
              p="4"
            >
              <VStack>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" name="name" bg="gray.150" />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input type="text" name="location" bg="gray.150" />
                </FormControl>
                <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Input type="text" name="location" bg="gray.150" />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea rows={16} name="description" bg="gray.150" />
                </FormControl>
              </VStack>
            </Box>
          </form>
        </VStack>
        <Spacer></Spacer>
        <Box flex="1">
          <Categories></Categories>
        </Box>
      </Flex>
    </VStack>
  );
};

export default Profile;
