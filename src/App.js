import React from 'react';
import './App.css';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App({signOut,user}) {
  return (
   <>
   <h1>Hello {user.username}</h1>
   <button onClick={signOut}>Sign out</button>
   </>
  );
}

export default withAuthenticator(App);


