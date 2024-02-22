import { Text, VStack, Heading, Accordion, Box } from "@chakra-ui/react";
import HistoryItem from "./HistoryItem";
import {  Event } from "../../store/eventsSlice";
import { Category } from "../../store/categoriesSlice";
import { useAppSelector } from "../../store";

const History = () => {
  const events = useAppSelector((state) => state.eventsSlice.events);
  const data = Object.values(events);
  return (
    <VStack
      w="full"
      sx={{
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        scrollbarWidth: "none",
        "&::-webkit-scrollbar-thumb": {
          borderRadius: "24px",
        },
        _hover: {
          "&::-webkit-scrollbar-thumb": {
            background: "grey",
          },
        },
      }}
    >
      <Heading as="h2" size="lg" marginY="4">
        Event History
      </Heading>
      <Box bg="app.accent" w="75%" p="8" borderRadius="lg" boxShadow="md">
      <Accordion allowMultiple>
        {data
          .filter(item => item.status === 'canceled' || item.end < Date.now())
          .map((item, index) => {
            return <HistoryItem key={index} data={item} />;
          })}
      </Accordion>
      </Box>
    </VStack>
  );
};

export default History;
