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

export const { addAllEvents } = eventsSlice.actions;
