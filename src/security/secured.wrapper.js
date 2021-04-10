import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

export default function Secured({ requiredRoles, children }) {
  const { keycloak } = useKeycloak();

  const checkRoles = () => {
    if (requiredRoles && requiredRoles.length > 0) {
      requiredRoles.forEach((rr) =>
        hasRole(keycloak.tokenParsed.realm_access.roles, rr, handleMissingRole)
      );
    }
  };
  const hasRole = (iterable, role, fallback) => {
    const exist = iterable.some((item) => item === role);
    if (!exist) {
      fallback.apply(this);
    }
  };
  const handleMissingRole = () => {
    console.log('missing role !!!');
  };
  const renderContent = () => {
    if (keycloak?.authenticated) {
      checkRoles();
      return <>{children}</>;
    }
    return keycloak?.login();
  };

  return <>{renderContent()}</>;
}
