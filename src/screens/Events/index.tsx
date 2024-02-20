import { Heading, VStack, Center, Text } from "@chakra-ui/react";
import { useAppDispatch, RootState } from "../../store";
import { useSelector } from "react-redux";
import { removeEvent } from "../../store/eventsSlice";
import Event from "./Event";

const Events = () => {
  const dispatch = useAppDispatch();

  const pendingEvents = useSelector(
    (state: RootState) => state.eventsSlice.events
  );

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
        Upcoming Events
      </Heading>
      {!pendingEvents.length && 
      
        <Text>
          You have no upcoming events would you like to 
        </Text>}
      {pendingEvents.length && pendingEvents.map((item) => {
        return (
          <Event
            key={item.id}
            data={item}
            onCancelEvent={() => dispatch(removeEvent(item.id))}
          />
        );
      })}
    </VStack>
  );
};

export default Events;
