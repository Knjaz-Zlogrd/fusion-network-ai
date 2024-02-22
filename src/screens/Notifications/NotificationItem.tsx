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
} from "@chakra-ui/react";

import { faBell } from "@fortawesome/free-solid-svg-icons";
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
  return (
    <Card>
      <CardBody bg="app.accent">
        <CardHeader>
          <HStack>
            <FontAwesomeIcon icon={faBell} />
            <Heading size="md" ml="8px">Client Report</Heading>
          </HStack>
        </CardHeader>
        <VStack spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Summary
            </Heading>
            <Text pt="2" fontSize="sm">
              View a summary of all your clients over the last month.
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Overview
            </Heading>
            <Text pt="2" fontSize="sm">
              Check out the overview of your clients.
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Analysis
            </Heading>
            <Text pt="2" fontSize="sm">
              See a detailed analysis of all your business clients.
            </Text>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default NotificationItem;
