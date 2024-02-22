import { Heading, VStack } from "@chakra-ui/react";
import NotificationItem from "./NotificationItem";

const NOTIFICATIONS = [
  {
    title: "Reading",
    message: "This event has been cancelled",
    time: 1709160300000,
  },
  {
    title: "Sports",
    message:
      "The participants for this event have been gathered and it will be held on 2024/05/06 20:30",
    time: 1709160300000,
  },
];

const Notifications = () => {
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
        Notifications
      </Heading>
      {NOTIFICATIONS.map((notification, index) => {
        return <NotificationItem notification={notification} key={index} />;
      })}
    </VStack>
  );
};

export default Notifications;
