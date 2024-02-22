import { Heading, VStack, Text, Button } from "@chakra-ui/react";
import { useAppSelector } from "../../store";
import { values } from "lodash";
import { Navigate, useNavigate } from "react-router-dom";
// import { removeEvent } from "../../store/eventsSlice";
import Event from "./Event";
import { ref, set } from "firebase/database";
import { db } from "../../firebaseConfig";
import { generateRandomId } from "../../utils/utils";
import { useEffect, useState } from "react";
import { getKeyFromFirebaseId } from "../../store/usersSlice";
import { UserResponseStatus, updateInvitation } from "../../store/eventsSlice";

interface UserEvent {
  event: Event;
  status: string;
}

const Events = () => {
  const navigate = useNavigate();
  const events = useAppSelector((state) => state.eventsSlice.events);
  const ownUid = useAppSelector((state) => state.loginSlice.uid);
  const ownKey = useAppSelector((state) =>
    getKeyFromFirebaseId(state.usersSlice, ownUid ?? "")
  );

  const eventsValues = values(events).filter((event) => {
    return event.invitations.find((invitation) => invitation.userId === ownKey);
  });

  const invitationHandler = (eventId: string, status: UserResponseStatus) => {
    const updated = updateInvitation(eventId, ownKey ?? "", status);
    const eventReference = ref(db, "events/" + eventId);
    set(eventReference, updated);
  };

  // console.log("SHOW EVENTS", showEvents);

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
      {!eventsValues.length && (
        <VStack>
          <Text>You have no upcoming events</Text>
          <Button
            bg="app.primary"
            color="white"
            _hover={{ bg: "app.secondary" }}
            onClick={() => navigate("/home/create")}
          >
            Create Event
          </Button>
        </VStack>
      )}

      {
        eventsValues.length &&
          Object.entries(events).map(([eventKey, event]) => {
            return (
              event.invitations.some(
                (invitation) => invitation.userId === ownKey
              ) && (
                <Event
                  key={eventKey}
                  data={event}
                  // onCancelEvent={console.log("JEBOTE")}
                  onAcceptEvent={() => invitationHandler(eventKey, "accepted")}
                  onRejectEvent={() => invitationHandler(eventKey, "rejected")}
                />
              )
            );
          })
      }
    </VStack>
  );
};

export default Events;
