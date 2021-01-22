import Keycloak from 'keycloak-js';
const keycloakConfig = {
  realm: 'nearmi-dev',
  clientId: 'nearmi-front',
  url: 'https://cluster.nearmi-dev/auth',
};
const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
