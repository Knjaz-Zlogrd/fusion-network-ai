import React from "react";
import { useState, useRef } from "react";
import { useAppDispatch, RootState } from "../../store";
import { useSelector } from "react-redux";
import { addEvent } from "../../store/eventsSlice";
import {
  Center,
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
} from "@chakra-ui/react";

function getTimestamp(dateString: string, hours: number, minutes: number) {
  // Create a new Date object from the date string
  const date = new Date(dateString);

  // Set hours and minutes of the date object
  date.setHours(hours);
  date.setMinutes(minutes);

  // Get the timestamp in milliseconds
  return date.getTime();
}

function generateRandomId(length = 8) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

const Create = () => {
  const [sliderMinMax, setSliderMinMax] = useState([0, 0]);

  const selectedCategories = useSelector(
    (state: RootState) => state.categoriesSlice.categories
  );

  const dispatch = useAppDispatch();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const newEvent = {
      id: generateRandomId(),
      category: selectedCategories.find(
        (category) => category.id == data.category
      ),
      location: data.location as string,
      description: data.description as string,
      minParticipants: parseFloat(data["participants-0"] as string),
      maxParticipants: parseFloat(data["participants-1"] as string),
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
    };
    console.log("NEW ", newEvent);
    dispatch(addEvent(newEvent));
    event.currentTarget.reset();
  }

  const formatHM = (value: number) => {
    if (value < 10) {
      const formatted = `0${value}`.replace(/0*/, "0");
      return formatted;
    }
    return value;
  };

  return (
    <VStack>
      <Heading as="h2" size="lg" marginBottom="4">
        Create Event
      </Heading>
      <form onSubmit={handleSubmit}>
        <Center bg="app.accent">
          <Grid
            templateColumns="repeat(3, 1fr)"
            gap={6}
            w="50%"
            background="login.background"
            top="30%"
            p="4"
          >
            <GridItem>
              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Select
                  placeholder="Select option"
                  name="category"
                  bg="gray.150"
                >
                  {selectedCategories.map((category, index) => {
                    return (
                      <option key={index} value={category.id}>
                        {category.title}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </GridItem>
            <GridItem rowSpan={3}>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  resize="none"
                  rows={10}
                  name="description"
                  bg="gray.150"
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isRequired>
                <FormLabel>Date</FormLabel>
                <Input type="date" name="date" bg="gray.150" />
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
                    bg="gray.150"
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
                    <NumberInputField name="startH" bg="gray.150" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>(m)</FormLabel>
                  <NumberInput defaultValue={0} min={0} max={60}>
                    <NumberInputField name="startM" bg="gray.150" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </HStack>
              <HStack mt="4">
                <FormControl>
                  <FormLabel>End (h)</FormLabel>
                  <NumberInput defaultValue={0} min={0} max={24}>
                    <NumberInputField name="endH" bg="gray.150" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel>(m)</FormLabel>
                  <NumberInput defaultValue={0} min={0} max={60}>
                    <NumberInputField name="endM" bg="gray.150" />
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
                <Input type="text" name="location" bg="gray.150" />
              </FormControl>
            </GridItem>
            <GridItem colEnd={4}>
              <HStack>
                <Button
                  // colorScheme="blue"
                  bg="app.primary"
                  color="white"
                  variant="solid"
                  type="submit"
                  marginRight="4"
                  _hover={{ color: "black", bg: "#dddfe2" }}
                >
                  Submit
                </Button>
                <Button colorScheme="gray" variant="solid" color="gray.150">
                  Cancel
                </Button>
              </HStack>
            </GridItem>
          </Grid>
        </Center>
      </form>
    </VStack>
  );
};

export default Create;
