import React from "react";
import { useState, useRef } from "react";
import { useAppDispatch, RootState } from "../../store";
import { useSelector } from "react-redux";
import { addEvent } from "../../store/eventsSlice";
import { getTimestamp, generateRandomId } from "../../utils/utils";
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
  useToast,
} from "@chakra-ui/react";

const today = new Date().toISOString().split("T")[0];

const Create = () => {
  const [sliderMinMax, setSliderMinMax] = useState([0, 0]);

  const selectedCategories = useSelector(
    (state: RootState) => state.categoriesSlice.categories
  );

  const dispatch = useAppDispatch();
  const toast = useToast();

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
      participants: [],
      creator: "Boban Rajovic",
      status: "Pending",
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

    dispatch(addEvent(newEvent));
    event.currentTarget.reset();

    toast({
      title: "Success!",
      description: "Your event has been created.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
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
              <FormControl>
                <FormLabel>End (h)</FormLabel>
                <NumberInput defaultValue={0} min={0} max={24}>
                  <NumberInputField name="endH" bg="gray.100" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
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
              <Input type="text" name="location" bg="gray.100" />
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
