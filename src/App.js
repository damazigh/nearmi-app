import React from 'react';
import Navbar from './components/navbar/navbar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/home/main';
import { Grid } from '@material-ui/core';
import { SnackBarProvider } from './components/snackbar/snackbar-provider';
import CreateShop from './pages/shop/create.shop';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#64d8cb',
      main: '#26a69a',
      dark: '#00766c',
    },
    secondary: {
      light: '#Light',
      main: '#80d8ff',
      dark: '#49a7cc',
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
                <Route exact path="/shop/create">
                  <CreateShop />
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
