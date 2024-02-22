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
import { Event } from "../../store/eventsSlice";
import { parseTimestamp } from "../../utils/utils";

interface Props {
  data: Event;
  // status: string;
}

interface StringKeys {
  [key: string]: any;
}

const tagColors: StringKeys = {
  Accepted: "green",
  Rejected: "red",
  Canceled: "gray",
};

const HistoryItem = ({ data }: Props) => {
  const startDate = parseTimestamp(data.start);
  const endDate = parseTimestamp(data.end);
  const participants = [...(data.participants || []), data.creator];
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
                    Participants ({(data.participants?.length || 0) + 1}/
                    {data.maxParticipants}):
                  </Text>
                </HStack>
                <AvatarGroup max={2}>
                  {participants.map((participant, index) => {
                    return (
                      <WrapItem key={index}>
                        <Avatar
                          name={participant}
                          title={participant}
                        />
                      </WrapItem>
                    );
                  })}
                </AvatarGroup>
              </VStack>
              <Box flex="4">
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
