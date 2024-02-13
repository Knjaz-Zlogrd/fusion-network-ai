import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  authToken: string | null
}

const initialState: State = {
  authToken: null,
};

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    addAuthToken: (state, action: PayloadAction<string | null>) => {
      state.authToken = action.payload;
    },
    removeAuthToken: (state) => {
      state.authToken = null;
    },
  }
});

export const {
  addAuthToken,
  removeAuthToken,
} = loginSlice.actions;