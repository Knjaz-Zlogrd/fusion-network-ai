import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sortBy, values } from "lodash";
import { Category } from "../screens/Profile/Categories";
import store from ".";

export type User = {
  firebaseId: String;
  id: string;
  address: string;
  country: string;
  city: string;
  description: string;
  email: string;
  name: string;
  phoneNumber: string;
  categories: Category[];
};

type MatchedUser = {
  userId: string; 
  userStatus: string;
}

export type State = {
  allUsers: Record<string, User>;
};

const initialState: State = {
  allUsers: {},
};

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    addAllUsers: (state, action: PayloadAction<Record<string, User>>) => {
      state.allUsers = action.payload;
    },
  },
});

export const getOwnUserInfo = (users: Record<string, User>) => {
  const allUsers = values(users);
  const uid = store.getState().loginSlice.uid;
  const currentUser = allUsers.find((user) => user.firebaseId === uid);
  return currentUser;
};

export const getKeyFromFirebaseId = (state: State, firebaseId: string) => {
  for (const key in state.allUsers) {
    if (state.allUsers[key].firebaseId === firebaseId) {
      return key;
    }
  }
};

export const createInvitations = (categoryId: string, creatorId: string) => {
  const allUsers = store.getState().usersSlice.allUsers;
  console.log("USERS", allUsers);
  
  const matchedUsers: MatchedUser[] = [];

  Object.entries(allUsers).forEach(([userKey, user]) => {
    if (user.categories && user.categories.some(cat => cat.id === categoryId)) {
      matchedUsers.push({
        userId: userKey,
        userStatus: (creatorId === userKey) ? 'accepted' : 'pending',
      });
    }
  });

  return matchedUsers;
  // return [];

  // return users.filter(
  //   (user) => {
  //     if (user.categories === undefined) return false;
  //     return user.categories.find((category) => category.id === categoryId) !==
  //     undefined
  //   }
      
  // );
};

export const { addAllUsers } = usersSlice.actions;
