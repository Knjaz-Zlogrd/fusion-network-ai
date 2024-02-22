import {
  Text,
  AccordionItem,
  Box,
  AccordionButton,
  AccordionPanel,
  HStack,
  Tag,
  Flex,
  VStack,
  Avatar,
  AvatarGroup,
  WrapItem,
} from "@chakra-ui/react";
import { faMinus, faPlus, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Event, EventStatus, getAcceptedInvitationUsers } from "../../store/eventsSlice";
import { parseTimestamp } from "../../utils/utils";

type Props = {
  data: Event;
};

type StringKeys = {
  [K in EventStatus]: string;
};

const tagColors: StringKeys = {
  pending: "orange",
  canceled: "red",
  held: "green",
};

const HistoryItem = ({ data }: Props) => {
  const startDate = parseTimestamp(data.start);
  const endDate = parseTimestamp(data.end);
  const participants = getAcceptedInvitationUsers(data);
  return (
    <AccordionItem bg="gray.300" mb="2px">
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <HStack>
                  <Text>{data.category?.title}</Text>
                  {!isExpanded && (
                    <>
                      <Text>|</Text>
                      <Tag
                        variant="solid"
                        colorScheme={tagColors[data.status] || "green"}
                      >
                        {data.status}
                      </Tag>
                      <Text>|</Text>
                      <Text as="b">Start: </Text>
                      <Text>
                        {startDate.dateString} {startDate.timeString}
                      </Text>
                      <Text>|</Text>
                      <Text as="b">End: </Text>
                      <Text>
                        {endDate.dateString} {endDate.timeString}
                      </Text>
                    </>
                  )}
                </HStack>
              </Box>
              <span className="fa-layers fa-fw">
                <FontAwesomeIcon icon={faSquare} size="lg" color="gray" />
                {isExpanded ? (
                  <FontAwesomeIcon
                    icon={faMinus}
                    size="xs"
                    inverse
                    color="gray.200"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faPlus}
                    size="xs"
                    inverse
                    color="gray.200"
                  />
                )}
              </span>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} bg="gray.100">
            <Flex>
              <VStack align="flex-start" flex="1">
                <HStack>
                  <Text as="b">Status: </Text>
                  <Tag
                    variant="solid"
                    colorScheme={tagColors[data.status] || "green"}
                  >
                    {data.status}
                  </Tag>
                </HStack>
                <HStack>
                  <Text as="b">Start: </Text>
                  <Text>
                    {startDate.dateString} {startDate.timeString}
                  </Text>
                </HStack>
                <HStack>
                  <Text as="b">End: </Text>
                  <Text>
                    {endDate.dateString} {endDate.timeString}
                  </Text>
                </HStack>
                <HStack>
                  <Text as="b">Location: </Text>
                  <Text>{data.location}</Text>
                </HStack>
                <HStack>
                  <Text as="b">Created by: </Text>
                  <Text>{data.creator}</Text>
                </HStack>
                <HStack>
                  <Text as="b">
                    Participants ({participants.length}/
                    {data.maxParticipants}):
                  </Text>
                  <AvatarGroup max={2}>
                    {participants.map((participant, index) => {
                      return (
                        <WrapItem key={index}>
                          <Avatar name={participant.name} title={participant.name} />
                        </WrapItem>
                      );
                    })}
                  </AvatarGroup>
                </HStack>
              </VStack>
              <Box flex="1">
                <Text fontWeight="bold">Description: </Text>
                {data.description}
              </Box>
            </Flex>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

export default HistoryItem;
