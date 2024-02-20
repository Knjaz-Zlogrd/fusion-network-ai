import {
  Text,
  AccordionItem,
  Box,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  HStack,
  Tag,
} from "@chakra-ui/react";
import { Event } from "../../store/eventsSlice";
import { parseTimestamp } from "../../utils/utils";

interface Props {
  data: Event;
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
  return (
    <AccordionItem bg="gray.300"  mb="2px">
      <h2>
        <AccordionButton >
          <Box as="span" flex="1" textAlign="left">
            <HStack>
              <Text>{data.category?.title} |</Text>
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
            </HStack>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} bg="gray.100">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>
  );
};

export default HistoryItem;
