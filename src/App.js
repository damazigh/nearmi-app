import React from 'react';
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import Navbar from './components/navbar/navbar'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './App.css';
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#fafafa",
      main: "#fafafa",
      dark: "#c7c7c7"
    },
    secondary: {
      light: "#379683",
      main: "#05386B",
      dark: "#05386B"
    }
  }
})
function App() {
  return (
  <div>
    <ThemeProvider theme={theme}>
      <Navbar/>
    </ThemeProvider>
  </div>
  );
}
export default withAuthenticator(App);
