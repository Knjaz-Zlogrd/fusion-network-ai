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
  useColorModeValue,
} from "@chakra-ui/react";
import Categories from "./Categories";
import { useAppSelector } from "../../store";
import { getOwnUserInfo } from "../../store/usersSlice";
const Profile = () => {
  const currentUser = useAppSelector((state) => getOwnUserInfo(state.usersSlice.allUsers));

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
              borderColor="gray.100"
              boxShadow="md"
              mr="32px"
              w="400px"
              h="700px"
              p="4"
            >
              <VStack>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" name="name" bg="gray.100" value={currentUser?.name} />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input type="text" name="location" bg="gray.100"  value={currentUser?.email} />
                </FormControl>
                <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Input type="text" name="location" bg="gray.100"  value={currentUser?.address} />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    rows={16}
                    name="description"
                    bg="gray.100"
                    resize="none"
                    defaultValue={currentUser?.description}
                  />
                </FormControl>
              </VStack>
            </Box>
          </form>
        </VStack>
        <Spacer></Spacer>
        <Box flex="1">
          <Categories currentUser={currentUser}></Categories>
        </Box>
      </Flex>
    </VStack>
  );
};

export default Profile;
