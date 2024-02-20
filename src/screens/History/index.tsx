import { Text, VStack, Heading, Accordion, Box } from "@chakra-ui/react";
import HistoryItem from "./HistoryItem";

const HISTORY = [
  {
    id: "nCUEgsc2",
    category: {
      id: "gardening",
      title: "Gardening",
    },
    location: "Novi Sad",
    description:
      "Sadimo biljke u saksije Sadimo biljke u saksije Sadimo biljke u saksije Sadimo biljke u saksije Sadimo biljke u saksije Sadimo biljke u saksije Sadimo biljke u saksije Sadimo biljke u saksije ",
    minParticipants: 3,
    maxParticipants: 5,
    creator: "Sinan Sakic",
    participants: ["John Doe", "Alice Johnson", "Michael Smith"],
    status: "Accepted",
    start: 1707989400000,
    end: 1707998100000,
  },
  {
    id: "zz2f1roS",
    category: {
      id: "meditation",
      title: "Meditation",
    },
    location: "dadada",
    description: "dadada",
    minParticipants: 0,
    maxParticipants: 10,
    creator: "Saban Saulic",
    participants: [
      "John Doe",
      "Alice Johnson",
      "Michael Smith",
      "Emma Watson",
      "David Brown",
      "Sophia Lee",
      "Daniel Garcia",
      "Olivia Martinez",
      "James Taylor",
    ],
    status: "Rejected",
    start: 1707087600000,
    end: 1707087600000,
  },
  {
    id: "2XwwIxjV",
    category: {
      id: "indoorActivities",
      title: "Indoor Activities",
    },
    location: "Kod Boreta",
    description:
      "Pozdrav za Debelog Boreta Pozdrav za Debelog Boreta Pozdrav za Debelog Boreta Pozdrav za Debelog Boreta Pozdrav za Debelog Boreta Pozdrav za Debelog Boreta Pozdrav za Debelog Boreta Pozdrav za Debelog Boreta Pozdrav za Debelog Boreta ",
    minParticipants: 3,
    maxParticipants: 5,
    creator: "Aca Lukas",
    participants: ["John Doe", "Alice Johnson", "Michael Smith", "Emma Watson"],
    status: "Canceled",
    start: 1709246700000,
    end: 1709247540000,
  },
  {
    id: "xRIPTBx0",
    category: {
      id: "outdoorActivities",
      title: "Outdoor Activities",
    },
    location: "Kobajasi",
    description: "Kurtomir",
    minParticipants: 2,
    maxParticipants: 5,
    creator: "Boban Rajovic",
    participants: ["John Doe", "Alice Johnson", "Michael Smith", "Emma Watson"],
    status: "Accepted",
    start: 1709160300000,
    end: 1709161140000,
  },
];

const History = () => {
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
      <Heading as="h2" size="lg" marginY="4">
        Event History
      </Heading>
      <Box bg="app.accent" w="75%" p="8" borderRadius="lg">
        <Accordion allowMultiple >
          {HISTORY.map((event, index) => {
            return <HistoryItem key={index} data={event}/>;
          })}
        </Accordion>
      </Box>
    </VStack>
  );
};

export default History;
