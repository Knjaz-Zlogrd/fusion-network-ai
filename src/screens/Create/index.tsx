import React from "react";
import { useState, useRef } from "react";
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

const Create = () => {
  const [sliderMinMax, setSliderMinMax] = useState([0, 0]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("SUBMITTED");
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
                  <option value="option1">Sports</option>
                  <option value="option2">Board Games</option>
                  <option value="option3">Killing Boars</option>
                  <option value="option4">Smashing Burgers</option>
                  <option value="option5">Staring into the Sun</option>
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
                <Input type="date" bg="gray.150" />
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
                    onChangeEnd={(val) => {
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
                    <NumberInputField bg="gray.150" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>(m)</FormLabel>
                  <NumberInput defaultValue={0} min={0} max={60}>
                    <NumberInputField bg="gray.150" />
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
                    <NumberInputField bg="gray.150" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel>(m)</FormLabel>
                  <NumberInput defaultValue={0} min={0} max={60}>
                    <NumberInputField bg="gray.150" />
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
                <Input type="text" bg="gray.150" />
              </FormControl>
            </GridItem>
            <GridItem colEnd={4}>
              <HStack>
                <Button
                  colorScheme="blue"
                  variant="solid"
                  type="submit"
                  marginRight="4"
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
