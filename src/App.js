import React from 'react';
import Navbar from './components/navbar/navbar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/main';
import { Grid, Snackbar } from '@material-ui/core';
import { SnackBarProvider } from './components/snackbar/snackbar-provider';
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#64d8cb',
      main: '#26a69a',
      dark: '#00766c',
    },
    secondary: {
      light: '#379683',
      main: '#05386B',
      dark: '#05386B',
    },
  },
});
function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <SnackBarProvider>
          <BrowserRouter>
            <Navbar />
            <Grid className="container">
              <Switch>
                <Route exact path="/home">
                  <Main />
                </Route>
              </Switch>
            </Grid>
          </BrowserRouter>
        </SnackBarProvider>
      </ThemeProvider>
    </div>
  );
}
export default App;
