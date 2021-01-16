import React from 'react';
import Navbar from './components/navbar/navbar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home/home';
import { Grid } from '@material-ui/core';
import { SnackBarProvider } from './components/snackbar/snackbar-provider';
import CreateShop from './pages/shop/create.shop';
import Secured from './security/secured.wrapper';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './security/keycloak';
import Loading from './components/loading/loading';

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
      <ReactKeycloakProvider
        authClient={keycloak}
        LoadingComponent={<Loading />}
      >
        <ThemeProvider theme={theme}>
          <SnackBarProvider>
            <BrowserRouter>
              <Navbar />
              <Grid className="container">
                <Switch>
                  <Route exact path="/home">
                    <Home />
                  </Route>
                  <Route exact path="/shop/create">
                    <Secured>
                      <CreateShop />
                    </Secured>
                  </Route>
                </Switch>
              </Grid>
            </BrowserRouter>
          </SnackBarProvider>
        </ThemeProvider>
      </ReactKeycloakProvider>
    </div>
  );
}
export default App;
