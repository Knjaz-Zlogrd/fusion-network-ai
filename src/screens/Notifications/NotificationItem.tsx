import {
  Text,
  Heading,
  HStack,
  Card,
  CardBody,
  CardHeader,
  Box,
  Spacer,
} from "@chakra-ui/react";

import { faBell, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { timeAgo } from "../../utils/utils";

export interface Notification {
  title: string;
  message: string;
  time: number;
}

interface Props {
  notification: Notification;
}

const NotificationItem = ({ notification }: Props) => {
  const timeAgoString: string = timeAgo(notification.time);
  return (
    <Card w="400px">
      <CardHeader bg="app.primary" borderTopRadius="lg">
        <HStack color="gray.300">
          <FontAwesomeIcon size="xl" icon={faBell} />
          <Heading size="md" ml="8px">
            {notification.title}
          </Heading>
          <Text> - {timeAgoString}</Text>
          <Spacer />
          <Box _hover={{cursor: "pointer"}}>
            <FontAwesomeIcon icon={faTimes} color="gray" />
          </Box>
        </HStack>
      </CardHeader>
      <CardBody bg="app.accent" borderBottomRadius="lg">
        <Text fontSize="sm">
          {notification.message}
        </Text>
      </CardBody>
    </Card>
  );
};

export default NotificationItem;
