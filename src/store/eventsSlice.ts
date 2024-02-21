import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "./categoriesSlice";

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
  events: Event[];
};

const initialState: State = {
  events: [],
};

export const eventsSlice = createSlice({
  name: "eventsSlice",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events = [...state.events, action.payload];
    },
    removeEvent: (state) => {
      state.events = state.events;
    },
  },
});

export const { addEvent, removeEvent } = eventsSlice.actions;
