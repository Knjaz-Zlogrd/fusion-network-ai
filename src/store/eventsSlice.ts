import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "./categoriesSlice";
import store from ".";
import { generateRandomId } from "../utils/utils";
import { ref, set } from "firebase/database";
import { db } from "../firebaseConfig";

export type Event = {
  category: Category | undefined;
  minParticipants: number;
  maxParticipants: number;
  participants: string[] | undefined;
  creator: string;
  start: number;
  end: number;
  // status: string;
  locationType: string | undefined;
  location: string;
  description: string;
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

export const createInvitations = async (eventId: string) => {
  const allUsers = store.getState().usersSlice.allUsers;
  const events = store.getState().eventsSlice.events;

  const event = events[eventId];
  const { category } = event;

  type MatchedUser = {
    userId: string; 
    userStatus: string;
  }
  const matchedUsers: MatchedUser[] = [];

  Object.entries(allUsers).forEach(([userKey, user]) => {
    if (user.categories && user.categories.some(cat => cat.id === category?.id)) {
      matchedUsers.push({
        userId: userKey,
        userStatus: 'pending',
      });
    }
  });

  const newEvent = {
    eventId: eventId,
    creatorId: event.creator,
    invitationStatus: 'pending',
    users: matchedUsers,
  };

  const invitationId = generateRandomId(6);
  const reference = ref(db, 'invitations/' + invitationId);
  set(reference, newEvent);
}

export const { addAllEvents } = eventsSlice.actions;
