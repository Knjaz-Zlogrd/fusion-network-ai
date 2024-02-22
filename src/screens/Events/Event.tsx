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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  AvatarGroup,
  WrapItem,
  Avatar,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTimes,
  faCheck,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import { capitalizeFirstLetter, parseTimestamp } from "../../utils/utils";
import { Event, getAcceptedInvitationUsers } from "../../store/eventsSlice";
import { useAppSelector } from "../../store";
import { getKeyFromFirebaseId } from "../../store/usersSlice";
import { ref, set } from "firebase/database";
import { db } from "../../firebaseConfig";

interface Props {
  data: Event;
  eventId: string;
  onCancelEvent?: any;
  onAcceptEvent: any;
  onRejectEvent?: any;
}

const PendingEvent = ({
  data,
  eventId,
  onCancelEvent,
  onAcceptEvent,
  onRejectEvent,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const startDateTime = parseTimestamp(data.start);
  const endDateTime = parseTimestamp(data.end);

  const ownUid = useAppSelector((state) => state.loginSlice.uid);
  const ownKey = useAppSelector((state) =>
    getKeyFromFirebaseId(state.usersSlice, ownUid ?? "")
  );

  const creator = useAppSelector(
    (state) => state.usersSlice.allUsers[data.creator]
  );

  const handleCancelEvent = () => {
    const reference = ref(db, "events/" + eventId);
    set(reference, {
      ...data,
      status: "canceled",
    });
  };

  const ownEventStatus = Object.values(data.invitations).find(
    (item) => item.userId === ownKey
  )?.userStatus;
  const titleStatus = capitalizeFirstLetter(ownEventStatus ?? "");

  const acceptedParticipants = getAcceptedInvitationUsers(eventId).map((user) => user.name);
  console.log("ACCEPTED " + eventId, acceptedParticipants);
  const eventFull = acceptedParticipants.length === data.maxParticipants;

  let titleColor: string;
  const getTitleColor = () => {
    switch (ownEventStatus) {
      case "accepted":
        return (titleColor = "green.500");
      case "pending":
        return (titleColor = "orange");
      case "rejected":
        return (titleColor = "red");
      default:
        return "white";
    }
  };

  return (
    <Card _hover={{ boxShadow: "outline" }} boxShadow="md">
      <CardHeader
        bg="app.primary"
        borderTopLeftRadius="lg"
        borderTopRightRadius="lg"
      >
        <Heading size="md" color="white">
          {data.category?.title} -{" "}
          <Text display="inline" color={getTitleColor()}>
            {eventFull ? "Full" : titleStatus}
          </Text>
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
              <Text fontWeight="bold">Created by: </Text>
              <Text>
                {data.creator === ownKey
                  ? "You"
                  : creator?.name || "Boban Rajovic"}
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
            <HStack>
              <Text fontWeight="bold">Participants: </Text>
              <Text>
                {data.minParticipants} - {data.maxParticipants}
              </Text>
            </HStack>
            <Text fontWeight="bold">Accepted ({acceptedParticipants.length}/{data.maxParticipants}): </Text>
            <AvatarGroup max={2}>
                  {acceptedParticipants.map((participant, index) => {
                    return (
                      <WrapItem key={index}>
                        <Avatar size="sm" name={participant} title={participant} />
                      </WrapItem>
                    );
                  })}
                </AvatarGroup>
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
        {data.creator === ownKey ? (
          <>
            <Button colorScheme="red" variant="solid" onClick={onOpen}>
              <HStack as="span" spacing="2">
                <FontAwesomeIcon icon={faBan} />
                <Text>Cancel</Text>
              </HStack>
            </Button>
            <Modal
              isOpen={isOpen}
              onClose={onClose}
              size="xl"
              motionPreset="scale"
            >
              <ModalOverlay />
              <ModalContent position="absolute" top="25%" left="35%" h="20%">
                <ModalHeader fontSize="24">Oh Noo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text fontSize="20">
                    Are you sure you want to cancel this event?
                  </Text>
                  <Text fontSize="20">People will be sad :(</Text>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={handleCancelEvent}>
                    Yes
                  </Button>
                  <Button variant="ghost" onClick={onClose}>
                    Party goes on
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        ) : (
          <>
            <Button
              variant="solid"
              marginRight="4"
              colorScheme="green"
              isDisabled={
                eventFull || Object.values(data.invitations).find(
                  (item) => item.userId === ownKey
                )?.userStatus === "accepted"
              }
              onClick={onAcceptEvent}
            >
              <HStack spacing="2">
                <FontAwesomeIcon icon={faCheck} />
                <Text>Accept</Text>
              </HStack>
            </Button>
            <Button
              colorScheme="red"
              variant="solid"
              isDisabled={
                Object.values(data.invitations).find(
                  (item) => item.userId === ownKey
                )?.userStatus === "rejected"
              }
              onClick={onRejectEvent}
            >
              <HStack spacing="2">
                <FontAwesomeIcon icon={faTimes} />
                <Text>Decline</Text>
              </HStack>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default PendingEvent;
