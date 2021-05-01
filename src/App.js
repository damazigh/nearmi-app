import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import ShopService from './service/shop.service';
import { shopConfLoaded } from './redux/action/shop.actions';
import Logger from 'js-logger';
import CreateUpdateProduct from './components/product/create-update.product';
import ProductDetail from './components/product/detail.product';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#64d8cb',
      main: '#26a69a',
      dark: '#00766c',
    },
    secondary: {
      light: '#Light',
      main: '#039be5',
      dark: '#49a7cc',
    },
  },
});
function App() {
  const dispatch = useDispatch();
  Logger.useDefaults();
  Logger.setLevel(Logger.DEBUG);

  useEffect(() => {
    ShopService.loadConfig().then((res) => {
      dispatch(shopConfLoaded(res.data));
    });
  }, []);

  const handleKcEvents = (event, error) => {
    switch (event) {
      case 'onAuthSuccess':
      case 'onAuthRefreshSuccess':
        localStorage.setItem('accessToken', keycloak.token);
        break;
      case 'onReady':
        if (keycloak.authenticated) {
          localStorage.setItem('accessToken', keycloak.token);
        } else {
          console.log('#### not authenticated');
          delete localStorage.accessToken;
        }
        break;
    }
  };

  return (
    <div>
      <ReactKeycloakProvider
        authClient={keycloak}
        LoadingComponent={<LinearLoading />}
        onEvent={handleKcEvents}
      >
        <ThemeProvider theme={theme}>
          <SnackBarProvider>
            <BrowserRouter>
              <Navbar />
              <Grid container>
                <Switch>
                  <Route exact path="/home">
                    <Grid item xs={12} md={12} sm={12} className="container">
                      <Home />
                    </Grid>
                  </Route>
                  <Route exact path="/shop/create">
                    <Secured>
                      <Grid item xs={12} md={12} sm={12} className="container">
                        <CreateShop />
                      </Grid>
                    </Secured>
                  </Route>
                  <Route exact path="/shop">
                    <Grid item xs={12} md={12} sm={12} className="container">
                      <NearbyShop />
                    </Grid>
                  </Route>
                  <Route exact path="/profile">
                    <Secured>
                      <Grid item xs={12} md={12} sm={12} className="container">
                        <Profile />
                      </Grid>
                    </Secured>
                  </Route>
                  <Route exact path="/shop/:id">
                    <Secured requiredRoles={[ROLE_PROFESSIONAL]}>
                      <DetailShop />
                    </Secured>
                  </Route>
                  <Route exact path="/shop/:id/products/:productName">
                    <Grid item xs={12} md={12} sm={12} className="container">
                      <ProductDetail />
                    </Grid>
                  </Route>
                  <Route exact path="/shop/:id/add-product">
                    <Grid item xs={12} md={12} sm={12} className="container">
                      <CreateUpdateProduct />
                    </Grid>
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
