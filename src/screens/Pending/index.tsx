import { Heading, VStack, Center } from "@chakra-ui/react";
import { useAppDispatch, RootState } from "../../store";
import { useSelector } from "react-redux";
import { removeEvent } from "../../store/eventsSlice";
import PendingEvent from "./PendingEvent";

const Pending = () => {
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

      {pendingEvents.map((item) => {
        return (
          <PendingEvent
            key={item.id}
            data={item}
            onCancelEvent={() => dispatch(removeEvent(item.id))}
          />
        );
      })}
    </VStack>
  );
};

export default Pending;
