import React from 'react';
import EventForm from '../components/event-form';
import Toolbar from '../components/toolbar';

export default function Home(props) {
  return (
    <>
    <Toolbar />
    <main>
    <EventForm/>
    </main>
    </>
  );
}
