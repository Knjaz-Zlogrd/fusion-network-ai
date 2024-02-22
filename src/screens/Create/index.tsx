import {
  Flex,
  VStack,
  Input,
  Button,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Heading,
  Select,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Box,
  Textarea,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Switch,
  Radio,
  RadioGroup,
  Text,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { getTimestamp, generateRandomId } from "../../utils/utils";
import { useAppSelector } from "../../store";
import { ref, set } from "@firebase/database";
import { db } from "../../firebaseConfig";
import Logo from "../../assets/Logo";
import {
  getKeyFromFirebaseId,
  getOwnUserInfo,
  createInvitations,
} from "../../store/usersSlice";

const meetingUrl = "https://meet.cymbus.com/j?MID=48054762918";
const today = new Date().toISOString().split("T")[0];

const Create = () => {
  const toast = useToast();
  const [sliderMinMax, setSliderMinMax] = useState([0, 0]);

  const [eventType, setEventType] = React.useState("onsite");
  const [channelIsChecked, setChannelIsChecked] = useState(false);

  const ownUid = useAppSelector((state) => state.loginSlice.uid);
  const ownKey = useAppSelector((state) =>
    getKeyFromFirebaseId(state.usersSlice, ownUid ?? "")
  );

  const currentUser = useAppSelector((state) =>
    getOwnUserInfo(state.usersSlice.allUsers)
  );
  const categories = currentUser?.categories;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const locationType = data.locationType as string;
    const location = locationType === "onsite" ? (data.location as string) : meetingUrl;
    const eventId = generateRandomId();
    const userInvitations = createInvitations(data.category as string, ownKey as string);

    const newEvent = {
      category: categories?.find((category) => category.id == data.category),
      locationType: locationType,
      location: location,
      description: data.description as string,
      minParticipants: parseFloat(data["participants-0"] as string),
      maxParticipants: parseFloat(data["participants-1"] as string),
      participants: [],
      creator: ownKey,
      status: "pending",
      createChannel: channelIsChecked,
      start: getTimestamp(
        formData.get("date") as string,
        parseFloat(data.startH as string),
        parseFloat(data.startM as string)
      ),
      end: getTimestamp(
        formData.get("date") as string,
        parseFloat(data.endH as string),
        parseFloat(data.endM as string)
      ),
      invitations: userInvitations,
    };
    const eventReference = ref(db, "events/" + eventId);
    set(eventReference, newEvent);
    event.currentTarget.reset();

    toast({
      title: "Success!",
      description: "Your event has been created.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  function handleCheckChannel() {
    setChannelIsChecked((prevValue) => !prevValue);
  }

  const formatHM = (value: number) => {
    if (value < 10) {
      const formatted = `0${value}`.replace(/0*/, "0");
      return formatted;
    }
    return value;
  };

  return (
    <VStack w="full">
      <Heading as="h2" size="lg" marginY="4">
        Create Event
      </Heading>
      <form onSubmit={handleSubmit}>
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={6}
          w="75%"
          borderWidth="1px"
          borderRadius="lg"
          borderColor="gray.100"
          margin="auto"
          bg="app.accent"
          boxShadow="md"
          top="30%"
          p="4"
        >
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Select placeholder="Select option" name="category" bg="gray.100">
                {categories?.map((category, index) => {
                  return (
                    <option key={index} value={category.id}>
                      {category.title}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem rowSpan={4}>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                resize="none"
                rows={12}
                name="description"
                bg="gray.100"
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Date</FormLabel>
              <Input type="date" name="date" bg="gray.100" min={today} />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Participants</FormLabel>
              <Flex alignItems="center">
                <Box flex="1" textAlign="left" marginRight="2">
                  {sliderMinMax[0]}
                </Box>
                <RangeSlider
                  aria-label={["min", "max"]}
                  defaultValue={sliderMinMax}
                  onChange={(val) => {
                    setSliderMinMax(val);
                  }}
                  name="participants"
                  max={10}
                  min={1}
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} />
                  <RangeSliderThumb index={1} />
                </RangeSlider>
                <Box flex="1" textAlign="right" marginLeft="2">
                  {sliderMinMax[1]}
                </Box>
              </Flex>
            </FormControl>
          </GridItem>
          <GridItem rowSpan={2}>
            <HStack>
              <FormControl isRequired>
                <FormLabel>Start (h)</FormLabel>
                <NumberInput defaultValue={0} min={0} max={24}>
                  <NumberInputField name="startH" bg="gray.100" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>(m)</FormLabel>
                <NumberInput defaultValue={0} min={0} max={60}>
                  <NumberInputField name="startM" bg="gray.100" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </HStack>
            <HStack mt="4">
              <FormControl isRequired>
                <FormLabel>End (h)</FormLabel>
                <NumberInput defaultValue={0} min={0} max={24}>
                  <NumberInputField name="endH" bg="gray.100" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>(m)</FormLabel>
                <NumberInput defaultValue={0} min={0} max={60}>
                  <NumberInputField name="endM" bg="gray.100" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </HStack>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Location</FormLabel>
              <RadioGroup
                name="locationType"
                mb="4px"
                defaultValue="onsite"
                onChange={setEventType}
                value={eventType}
              >
                <HStack>
                  <Radio value="onsite" bg="white">
                    Onsite
                  </Radio>
                  <Radio value="online" bg="white">
                    Online
                  </Radio>
                </HStack>
              </RadioGroup>
              {eventType === "online" ? (
                <Flex
                  h="40px"
                  alignItems="center"
                  bg="gray.100"
                  borderRadius="4px"
                >
                  <Link color="blue">{meetingUrl}</Link>
                </Flex>
              ) : (
                <Input type="text" name="location" bg="gray.100" />
              )}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="create-channel" mb="0">
                <HStack>
                  <Logo />
                  <Text>Create AUCA channel?</Text>
                </HStack>
              </FormLabel>
              <Switch
                id="create-channel"
                name="createChannel"
                isChecked={channelIsChecked}
                onChange={handleCheckChannel}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={3}>
            <HStack>
              <Button
                bg="app.primary"
                color="white"
                variant="solid"
                type="submit"
                marginRight="4px"
                _hover={{ bg: "app.secondary" }}
              >
                Create
              </Button>
              <Button colorScheme="gray" variant="solid">
                Cancel
              </Button>
            </HStack>
          </GridItem>
        </Grid>
      </form>
    </VStack>
  );
};

export default Create;
