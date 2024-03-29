import React from 'react';
import { Flex, HStack } from '@chakra-ui/react';
import Navigation from './Navigation';
import { Route, Routes } from 'react-router-dom';
import Create from '../Create';
import Pending from '../Events';
import Profile from '../Profile';
import History from '../History';
import { onValue, ref } from '@firebase/database';
import { useAppDispatch } from '../../store';
import { db } from '../../firebaseConfig';
import { User, addAllUsers } from '../../store/usersSlice';
import { Event, addAllEvents } from '../../store/eventsSlice';
import { Invitation, addInvitations } from '../../store/invitationsSlice';
import Notifications from '../Notifications';

const Home = () => {
  const dispatch = useAppDispatch();
  const usersRef = ref(db, 'users');
  const eventsRef = ref(db, 'events');
  const invitationsRef = ref(db, 'invitations');


  onValue(usersRef, (snapshot) => {
    const data = snapshot.val();
    const allUsers: Record<string, User> = {}

    for (const key in data) {
      allUsers[key] = data[key]
    }
    dispatch(addAllUsers(allUsers));
  });

  onValue(eventsRef, (snapshot) => {
    const data = snapshot.val();
    const events: Record<string, Event> = {}

    for (const key in data) {
      events[key] = data[key]
      // createInvitation(key);
    }
    dispatch(addAllEvents(events));
  });

  onValue(invitationsRef, (snapshot) => {
    const data = snapshot.val();
    const invitations: Record<string, Invitation> = {}

    for (const key in data) {
      invitations[key] = data[key]
    }
    dispatch(addInvitations(invitations));
  })
  
  return (
    <HStack 
      h="100vh" 
      w="full"
      minW="1100px" 
      spacing="0" 
      align="stretch" 
      overflow="auto"
    >
      <Flex as="nav" justify="center">
        <Navigation />
      </Flex>
      <Flex as="main" flex="1">
        <Routes>
          <Route path="profile" element={<Profile />}/>
          <Route path="create" element={<Create />}/>
          <Route path="events" element={<Pending />}/>
          <Route path="notifications" element={<Notifications />}/>
          <Route path="history" element={<History />}/>
        </Routes>
      </Flex>
    </HStack>
  );
};

export default Home;