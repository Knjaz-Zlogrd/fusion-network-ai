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
  Flex,
  Box,
  Link,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { parseTimestamp } from "../../utils/utils";
import { Event } from "../../store/eventsSlice";

interface Props {
  data: Event;
  // onCancelEvent: () => {};
}

const PendingEvent = ({ data }: Props) => {
  const startDateTime = parseTimestamp(data.start);
  const endDateTime = parseTimestamp(data.end);

  return (
    <Card _hover={{ boxShadow: "outline" }} boxShadow="md">
      <CardHeader
        bg="app.primary"
        borderTopLeftRadius="lg"
        borderTopRightRadius="lg"
      >
        <Heading size="md" color="white">
          {data.category?.title}
        </Heading>
      </CardHeader>
      <Divider />
      <CardBody bg="app.accent">
        <Flex w="600px">
          <VStack flex="2" align="flex-start">
            <HStack>
              <Text fontWeight="bold">Category: </Text>
              <Text>{data.category?.title}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Location: </Text>
              {data.locationType === "onsite" ? (
                <Text>{data.location}</Text>
              ) : (
                <Link href={data.location} title={data.location} color="blue">
                  AUCA Meeting
                </Link>
              )}
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

          <Box
            maxW="container.lg"
            flex="3"
            wordBreak="break-word"
            overflowWrap="break-word"
          >
            <Text fontWeight="bold">Description: </Text>
            {data.description}
          </Box>
        </Flex>
      </CardBody>
      <CardFooter bg="app.accent">
        <Button
          variant="solid"
          marginRight="4"
          bg="app.primary"
          color="white"
          _hover={{ bg: "app.secondary" }}
        >
          <HStack spacing="2">
            <FontAwesomeIcon icon={faEdit} />
            <Text>Edit</Text>
          </HStack>
        </Button>
        <Button colorScheme="red" variant="solid" >
          <HStack spacing="2">
            <FontAwesomeIcon icon={faTimes} />
            <Text>Cancel</Text>
          </HStack>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PendingEvent;
