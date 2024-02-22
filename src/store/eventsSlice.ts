import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "./categoriesSlice";
import store from ".";
import { generateRandomId } from "../utils/utils";
import { ref, set } from "firebase/database";
import { db } from "../firebaseConfig";

export type EventStatus = 'pending' | 'canceled' | 'held';

export type UserResponseStatus = 'pending' | 'accepted' | 'rejected';

export type Invitation = {
  userId: string;
  status: UserResponseStatus;
}

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
