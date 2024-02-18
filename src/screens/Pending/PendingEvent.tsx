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
      minWidth="300px"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardHeader>
        <Heading size="md"> {data.category}</Heading>
      </CardHeader>
        <Divider />
      <CardBody>
        {Object.entries(data).map(([key, value]) => (
          <HStack key={key}>
            <Text fontWeight="bold">{capitalize(key)}: </Text>
            <Text>{typeof value === "string" ? value : String(value)}</Text>
          </HStack>
        ))}
      </CardBody>
      <CardFooter>
        <Button colorScheme="blue" variant="solid" marginRight="4">
          View
        </Button>
        <Button colorScheme="gray" variant="outline">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PendingEvent;
