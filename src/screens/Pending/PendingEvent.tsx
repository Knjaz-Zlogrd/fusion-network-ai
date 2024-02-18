import {
  Text,
  Heading,
  HStack,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Divider
} from "@chakra-ui/react";

import { useState } from "react";

interface Data {
  [key: string]: string | number | string[] | number[];
}

interface Props {
  data: Data;
}

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const PendingEvent = ({ data }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      variant={isHovered ? "filled" : "outline"}
      minWidth="33%"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardHeader bg="app.primary">
        <Heading size="md" color="white"> {data.category}</Heading>
      </CardHeader>
        <Divider />
      <CardBody  bg="app.accent">
        {Object.entries(data).map(([key, value]) => (
          <HStack key={key}>
            <Text fontWeight="bold">{capitalize(key)}: </Text>
            <Text>{typeof value === "string" ? value : String(value)}</Text>
          </HStack>
        ))}
      </CardBody>
      <CardFooter  bg="app.accent">
        <Button colorScheme="blue" variant="solid" marginRight="4">
          View
        </Button>
        <Button colorScheme="gray" variant="solid">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PendingEvent;
