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
import { LinearLoading } from './components/loading/loading';
import NearbyShop from './pages/shop/nearby.shop';
import Profile from './pages/profile/profile';
import DetailShop from './pages/shop/detail.shop';
import { ROLE_PROFESSIONAL } from './utils/roles.constants';

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
  const handleKcEvents = (event, error) => {
    switch (event) {
      case 'onAuthSuccess':
      case 'onAuthRefreshSuccess':
        localStorage.setItem('accessToken', keycloak.token);
        break;
      case 'onReady':
        if (keycloak.authenticated) {
          localStorage.setItem('accessToken', keycloak.token);
        }
        break;
    }
  };

  return (
    <div>
      {/*<ReactKeycloakProvider
        authClient={keycloak}
        LoadingComponent={<LinearLoading />}
        onEvent={handleKcEvents}
      > */}
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
                <Route exact path="/shop">
                  <NearbyShop />
                </Route>
                <Route exact path="/profile">
                  <Secured>
                    <Profile />
                  </Secured>
                </Route>
                <Route exact path="/shop/:id">
                  <Secured requiredRoles={[ROLE_PROFESSIONAL]}>
                    <DetailShop />
                  </Secured>
                </Route>
              </Switch>
            </Grid>
          </BrowserRouter>
        </SnackBarProvider>
      </ThemeProvider>
      {/*</ReactKeycloakProvider>*/}
    </div>
  );
}
export default App;
