import React from 'react';
import logo from './logo.svg';
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import './App.css';

function App() {
  return (
  <div>
    <AmplifySignOut />
  </div>
  );
}
export default withAuthenticator(App);
