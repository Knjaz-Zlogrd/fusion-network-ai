import { Heading, VStack, Center } from "@chakra-ui/react";

import PendingEvent from "./PendingEvent";

const PENDING_EVENTS = [
  {
    category: "Board Games",
    participants: [4, 8],
    date: "03/05/2024",
    from: "12:30",
    to: "16:00",
  },
  {
    category: "Staring into the Sun",
    participants: [2, 35],
    date: "12/06/2024",
    from: "19:30",
    to: "23:30",
  },
  {
    category: "Silly Walking",
    participants: [3, 11],
    date: "11/09/2024",
    from: "10:00",
    to: "16:00",
  },
  {
    category: "Moving Furniture",
    participants: [4, 8],
    date: "03/05/2024",
    from: "12:30",
    to: "16:00",
  },
];

const Pending = () => {
  return (
    <VStack
      w="full"
      sx={{
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        scrollbarWidth: "thin",
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
      <Heading as="h2" size="lg" marginBottom="4">
        Pending Events
      </Heading>

      {PENDING_EVENTS.map((item) => {
        return <PendingEvent data={item} />;
      })}
    </VStack>
  );
};

export default Pending;
