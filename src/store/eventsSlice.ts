import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "./categoriesSlice";
import store from ".";
import { generateRandomId } from "../utils/utils";
import { ref, set } from "firebase/database";
import { db } from "../firebaseConfig";
import { stat } from "fs";

export type EventStatus = "pending" | "canceled" | "held";

export type UserResponseStatus = "pending" | "accepted" | "rejected";

export type Invitation = {
  userId: string;
  userStatus: UserResponseStatus;
};

export type Event = {
  category: Category | undefined;
  minParticipants: number;
  maxParticipants: number;
  participants: string[] | undefined;
  creator: string;
  start: number;
  end: number;
  status: EventStatus;
  locationType: string | undefined;
  location: string;
  description: string;
  invitations: Invitation[];
};

type State = {
  events: Record<string, Event>;
};

const initialState: State = {
  events: {},
};

export const eventsSlice = createSlice({
  name: "eventsSlice",
  initialState,
  reducers: {
    addAllEvents: (state, action: PayloadAction<Record<string, Event>>) => {
      state.events = action.payload;
    },
  },
});

export const updateEventInvitations = (
  userId: string,
  categoryIds: string[]
) => {
  const events = store.getState().eventsSlice.events;
  Object.entries(events).forEach(([eventId, event]) => {
    const invitations = event.invitations;
    const userInvited = invitations.some((invitation) => invitation.userId === userId);
    if (
      event.category &&
      categoryIds.find((categoryId) => categoryId === event.category?.id) &&
      !userInvited
    ) {
      console.log("EVENT", event);
      console.log("MATCHING CATEGORY FOR MISSING EVENT", event.category);
      const updatedEvent = addInvitation(event, userId, "pending");
      console.log("UPDATED EVENT", updatedEvent);
      const reference = ref(db, 'events/' + eventId);
      set(reference, updatedEvent);
    }
  });
};


export const addInvitation = (eventData: Event, userId: string, userStatus: UserResponseStatus): Event => {
  return {
      ...eventData,
      invitations: [
          ...eventData.invitations,
          { userId, userStatus }
      ]
  };
}

export const updateInvitation = (
  eventId: string,
  userId: string,
  status: UserResponseStatus
) => {
  const events = store.getState().eventsSlice.events;
  const eventData = events[eventId];
  // Find the index of the invitation with the matching userId
  const invitationIndex = eventData.invitations.findIndex(
    (invitation: Invitation) => invitation.userId === userId
  );

  // If the invitation with the provided userId is found
  if (invitationIndex !== -1) {
    // Create a copy of the original object
    const updatedEventData = { ...eventData };

    // Create a copy of the invitation object at the found index
    const updatedInvitation = {
      ...updatedEventData.invitations[invitationIndex],
    };

    // Update the userStatus of the invitation to "active"
    updatedInvitation.userStatus = status;

    // Update the invitations array in the copied object with the updated invitation
    updatedEventData.invitations = [
      ...updatedEventData.invitations.slice(0, invitationIndex),
      updatedInvitation,
      ...updatedEventData.invitations.slice(invitationIndex + 1),
    ];

    // Return the updated object
    return updatedEventData;
  }

  // If the invitation with the provided userId is not found, return the original object
  return eventData;
};

export const getAcceptedInvitationUsers = (event: Event) => {
  const users = store.getState().usersSlice.allUsers;
  const invitations = event.invitations.filter(
    (invitation) => invitation.userStatus === "accepted"
  );
  return invitations.map((invitation) => {
    return users[invitation.userId];
  });
};

// export const createInvitation = async (eventId: string) => {
//   const allUsers = store.getState().usersSlice.allUsers;
//   const events = store.getState().eventsSlice.events;
//   const invitations = store.getState().invitationsSlice.invitations;

//   for (const invitationId in invitations) {
//     if (invitations[invitationId].eventId === eventId) {
//       console.log(`Invitation already exist for event with ID ${eventId}. Skipping invitation creation.`);
//       return;
//     }
//   }

//   const event = events[eventId];
//   const { category } = event;

//   type MatchedUser = {
//     userId: string;
//     userStatus: string;
//   }
//   const matchedUsers: MatchedUser[] = [];

//   Object.entries(allUsers).forEach(([userKey, user]) => {
//     if (user.categories && user.categories.some(cat => cat.id === category?.id)) {
//       matchedUsers.push({
//         userId: userKey,
//         userStatus: 'pending',
//       });
//     }
//   });

//   const invitation = {
//     eventId: eventId,
//     creatorId: event.creator,
//     invitationStatus: 'pending',
//     users: matchedUsers,
//   };

//   const invitationId = generateRandomId(6);
//   const reference = ref(db, 'invitations/' + invitationId);
//   set(reference, invitation);
// }

// export const getOwnEvents = () => {
//   const uid = store.getState().loginSlice.uid;
//   const events = store.getState().eventsSlice.events;
//   const invitations = Object.values(store.getState().invitationsSlice.invitations);

//   const ownEvents = [];

//   for (const invitation in invitations) {
//       // if (invitation.users)
//   }
// }

export const { addAllEvents } = eventsSlice.actions;
