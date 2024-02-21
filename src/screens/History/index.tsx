import { Text, VStack, Heading, Accordion, Box } from "@chakra-ui/react";
import HistoryItem from "./HistoryItem";

const HISTORY = [
  {
    status: "Accepted",
    event: {
      id: "nCUEgsc2",
      category: {
        id: "gardening",
        title: "Gardening",
      },
      location: "Novi Sad",
      locationType: "onsite",
      description:
        "Sadimo biljke u saksije Sadimo biljke u saksije Sadimo biljke u saksije Sadimo biljke u saksije Sadimo biljke u saksije Sadimo biljke u saksije Sadimo biljke u saksije Sadimo biljke u saksije ",
      minParticipants: 3,
      maxParticipants: 5,
      creator: "Sinan Sakic",
      participants: ["John Doe", "Alice Johnson", "Michael Smith"],

      start: 1707989400000,
      end: 1707998100000,
    },
  },
  {
    status: "Rejected",
    event: {
      id: "zz2f1roS",
      category: {
        id: "meditation",
        title: "Meditation",
      },
      location: "dadada",
      description: "dadada",
      locationType: "onsite",
      minParticipants: 0,
      maxParticipants: 10,
      creator: "Saban Saulic",
      participants: [
        "David Brown",
        "Sophia Lee",
        "Daniel Garcia",
        "Olivia Martinez",
        "John Doe",
        "Alice Johnson",
        "Michael Smith",
        "Emma Watson",
        "James Taylor",
      ],

      start: 1707087600000,
      end: 1707087600000,
    },
  },
  {
    status: "Canceled",
    event: {
      id: "2XwwIxjV",
      category: {
        id: "indoorActivities",
        title: "Indoor Activities",
      },
      location: "Kod Boreta",
      locationType: "onsite",
      description:
        "Pozdrav za Debelog Boreta Pozdrav za Debelog Boreta Pozdrav za Debelog Boreta Pozdrav za Debelog Boreta Pozdrav za Debelog Boreta Pozdrav za Debelog Boreta Pozdrav za Debelog Boreta Pozdrav za Debelog Boreta Pozdrav za Debelog Boreta ",
      minParticipants: 3,
      maxParticipants: 5,
      creator: "Aca Lukas",
      participants: [
        "Michael Smith",
        "Emma Watson",
        "John Doe",
        "Alice Johnson",
      ],

      start: 1709246700000,
      end: 1709247540000,
    },
  },
  {
    status: "Accepted",
    event: {
      id: "xRIPTBx0",
      category: {
        id: "outdoorActivities",
        title: "Outdoor Activities",
      },
      locationType: "onsite",
      location: "Kobajasi",
      description: "Kurtomir",
      minParticipants: 2,
      maxParticipants: 5,
      creator: "Boban Rajovic",
      participants: [
        "Alice Johnson",
        "Michael Smith",
        "John Doe",
        "Emma Watson",
      ],

      start: 1709160300000,
      end: 1709161140000,
    },
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
          {HISTORY.map((item, index) => {
            return <HistoryItem key={index} data={item.event} status={item.status}/>;
          })}
        </Accordion>
      </Box>
    </VStack>
  );
};

export default History;
