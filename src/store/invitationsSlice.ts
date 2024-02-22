import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sortBy, values } from "lodash";

type InvitationStatus = 'pending' | 'canceled' | 'held';

type UserResponseStatus = 'pending' | 'accepted' | 'rejected';

type InvitedUsers = {
  userId: string;
  userStatus: UserResponseStatus;
}

export type Invitation = {
  creatorId: string;
  eventId: string;
  invitationStatus: InvitationStatus;
  users: InvitedUsers[];
}

export type State = {
  invitations: Record<string, Invitation>
}

const initialState: State = {
  invitations: {}
}

export const invitationsSlice = createSlice({
  name: 'invitationsSlice',
  initialState,
  reducers: {
    addInvitations: (state, action: PayloadAction<Record<string, Invitation>>) => {
      state.invitations = action.payload;
    },
  }
});

export const {addInvitations} = invitationsSlice.actions;