import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

export default function Secured(props) {
  const { keycloak, initialized } = useKeycloak();

  const renderContent = () => {
    if (keycloak?.authenticated) {
      return <>{props.children}</>;
    }
    return keycloak?.login();
  };

  return <>{renderContent()}</>;
}
