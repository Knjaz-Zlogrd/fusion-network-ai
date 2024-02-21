import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sortBy, values } from "lodash";
import { Category } from "../screens/Profile/Categories";
import store from ".";

export type User = {
  firebaseId: String;
  id: string;
  address: string;
  country: string;
  description: string;
  email: string;
  name: string;
  phoneNumber: string;
  categories: Category[];
}

export type State = {
  allUsers: Record<string, User>
}

const initialState: State = {
  allUsers: {},
}

export const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    addAllUsers: (state, action: PayloadAction<Record<string, User>>) => {
      state.allUsers = action.payload;
    },
  }
});

export const getOwnUserInfo = (users: Record<string, User>) => {
  const allUsers = values(users);
  const uid = store.getState().loginSlice.uid;
  const currentUser = allUsers.find((user) => user.firebaseId === uid)
  return currentUser;
}

export const getKeyFromFirebaseId = (state: State, firebaseId: string) => {
    for (const key in state.allUsers) {
      if (state.allUsers[key].firebaseId === firebaseId) {
        return key;
      }
    }
  };

export const {addAllUsers} = usersSlice.actions;