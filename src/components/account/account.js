import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DropdownMenu, { DropdownMenuMain } from '../dropdown/dropdown.menu';
import TranslateIcon from '@material-ui/icons/Translate';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Language from './language';
import DropdownItem from '../dropdown/dropdown-item/dropdown.item';
import { useKeycloak } from '@react-keycloak/web';

function Account() {
  const [height, setMenuHeight] = useState(null);
  const [activeMenu, setActiveMenu] = useState('main');
  const { t } = useTranslation();
  const { keycloak } = useKeycloak();

  const logout = () => {
    keycloak.logout();
  };

  return (
    <DropdownMenu setMenuHeight={setMenuHeight} height={height}>
      <DropdownMenuMain activeMenu={activeMenu} setMenuHeight={setMenuHeight}>
        <DropdownItem
          setActiveMenu={setActiveMenu}
          leftIcon={<TranslateIcon />}
          goToMenu="language"
        >
          {t('components.account.lng')}
        </DropdownItem>
        <DropdownItem leftIcon={<ExitToAppIcon />} onClick={(e) => logout()}>
          {t('components.account.logout')}
        </DropdownItem>
      </DropdownMenuMain>
      <Language setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
    </DropdownMenu>
  );
}

export default Account;
