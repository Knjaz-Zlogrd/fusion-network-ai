import {
  Flex,
  VStack,
  Heading,
  Spacer,
  FormControl,
  Textarea,
  FormLabel,
  Input,
  Box,
  Button,
  Toast,
  useToast,
} from "@chakra-ui/react";
import Categories from "./Categories";
import { MutableRefObject, useRef } from "react";
import { useAppSelector } from "../../store";
import { getKeyFromFirebaseId, getOwnUserInfo } from "../../store/usersSlice";
import { ref, set } from "@firebase/database";
import { db } from "../../firebaseConfig";
const Profile = () => {
  const descRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const toast = useToast();
  const currentUser = useAppSelector((state) =>
    getOwnUserInfo(state.usersSlice.allUsers)
  );

  const ownUid = useAppSelector((state) => state.loginSlice.uid);
  const ownKey = useAppSelector((state) =>
    getKeyFromFirebaseId(state.usersSlice, ownUid ?? "")
  );
  const reference = ref(db, "users/" + ownKey);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const updatedUser = {
      ...currentUser,
      description: descRef.current.value,
    };
    set(reference, updatedUser);
    toast({
      title: "Success!",
      description: "User profile updated.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <VStack w="full">
      <Heading as="h2" size="lg" marginY="4">
        User Profile
      </Heading>
      <Flex>
        <VStack flex="24">
          <form onSubmit={handleSubmit}>
            <Box
              bg="app.accent"
              borderWidth="1px"
              borderRadius="lg"
              borderColor="gray.100"
              boxShadow="md"
              mr="32px"
              w="400px"
              h="750px"
              p="4"
            >
              <VStack>
                <Heading as="h4" size="sm" marginBottom="4">
                  User info
                </Heading>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    readOnly
                    type="text"
                    name="name"
                    bg="gray.100"
                    value={currentUser?.name}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    readOnly
                    type="text"
                    name="location"
                    bg="gray.100"
                    value={currentUser?.email}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Input
                    readOnly
                    type="text"
                    name="location"
                    bg="gray.100"
                    value={currentUser?.address}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    rows={15}
                    name="description"
                    bg="gray.100"
                    resize="none"
                    ref={descRef}
                    defaultValue={currentUser?.description}
                  />
                </FormControl>
              </VStack>
              <Box mt="16px">
                <Button
                  // colorScheme="blue"
                  bg="app.primary"
                  color="white"
                  variant="solid"
                  type="submit"
                  _hover={{ bg: "app.secondary" }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </form>
        </VStack>
        <Spacer></Spacer>
        <Box flex="1">
          <Categories currentUser={currentUser} ownKey={ownKey}></Categories>
        </Box>
      </Flex>
    </VStack>
  );
};

export default Profile;
