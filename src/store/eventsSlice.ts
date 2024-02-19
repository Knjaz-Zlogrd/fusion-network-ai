import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Event = {
  id: string;
  category: {
    id: string,
    title: string
  } | undefined,
  minParticipants: number,
  maxParticipants: number,
  start: number,
  end: number,
  location: string,
  description: string
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
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter((event) => {
        return event.id != action.payload;
      });
    },
  },
});

export const { addEvent, removeEvent } = eventsSlice.actions;

export type { Event };