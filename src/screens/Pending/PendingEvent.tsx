import {
  Text,
  Heading,
  HStack,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Divider,
  VStack,
  Container,
  Flex
} from "@chakra-ui/react";

import { Event } from "../../store/eventsSlice";

interface Props {
  data: Event,
  onCancelEvent: () => {}
}

function parseTimestamp(timestamp: number) {
  const date = new Date(timestamp);

  // Get the date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed

  // Get the time components
  const hours = String(date.getHours()).padStart(2, "0"); // Add leading zero if needed
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Add leading zero if needed

  // Construct the date and time strings
  const dateString = `${year}/${month}/${day}`;
  const timeString = `${hours}:${minutes}`;

  return { dateString, timeString };
}

const PendingEvent = ({ data, onCancelEvent }: Props) => {
    const startDateTime = parseTimestamp(data.start);
  const endDateTime = parseTimestamp(data.end);

  return (
    <Card
      _hover={{ boxShadow: "outline" }}
    >
      <CardHeader bg="app.primary" borderTopLeftRadius="lg" borderTopRightRadius="lg">
        <Heading size="md" color="white">
          {data.category?.title}
        </Heading>
      </CardHeader>
      <Divider />
      <CardBody bg="app.accent">
        <Flex w="400px">
          <VStack flex="2" align="flex-start">
            <HStack>
              <Text fontWeight="bold">Category: </Text>
              <Text>{data.category?.title}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Location: </Text>
              <Text>{data.location}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Participants: </Text>
              <Text>
                {data.minParticipants} - {data.maxParticipants}
              </Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Start: </Text>
              <Text>
                {startDateTime.dateString} {startDateTime.timeString}
              </Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">End: </Text>
              <Text>
                {endDateTime.dateString} {endDateTime.timeString}
              </Text>
            </HStack>
          </VStack>
          <Container maxW="container.sm" flex="1">
            {data.description}
          </Container>
        </Flex>
      </CardBody>
      <CardFooter bg="app.accent">
        <Button colorScheme="blue" variant="solid" marginRight="4">
          View
        </Button>
        <Button colorScheme="gray" variant="solid" onClick={onCancelEvent}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PendingEvent;
