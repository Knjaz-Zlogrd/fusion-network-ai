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

const Events = () => {
  const navigate = useNavigate();
  const events = useAppSelector((state) => state.eventsSlice.events);

  const eventsValues = values(events);

  const invitations = useAppSelector((state) => state.invitationsSlice.invitations);
  console.log(invitations, 'INVITATIONS');

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

      {eventsValues.length &&
        eventsValues.map((item, index) => {
          return (
            <Event
              key={index}
              data={item}
              // onCancelEvent={console.log("JEBOTE")}
            />
          );
        })}
    </VStack>
  );
};

export default Events;
