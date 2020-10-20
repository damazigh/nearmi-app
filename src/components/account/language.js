import React from 'react';
import DropdownItem from '../dropdown/dropdown-item/dropdown.item';
import { DropdownSubMenu } from '../dropdown/dropdown.menu';
import CheckIcon from '@material-ui/icons/Check';
import { useDispatch, useSelector } from 'react-redux';
import { currentLngSelector } from '../../redux/selector/account.selector';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { languageChanges } from '../../redux/action/account.action';

function Language(props) {
  const availableLng = JSON.parse(process.env.REACT_APP_LNGS);
  const { t } = useTranslation();
  const currentLng = useSelector(currentLngSelector);
  console.log(availableLng);
  const dispatch = useDispatch();

  const setLng = (lng) => {
    if (availableLng.some((l) => l.id === lng)) {
      i18n.changeLanguage(lng);
      dispatch(languageChanges(lng));
    }
  };
  const buildEntries = (availableLngs) => {
    const res = [];
    availableLngs.forEach((lng, i) => {
      const item = (
        <DropdownItem
          key={'lng_' + lng.id}
          rightIcon={lng.id === currentLng ? <CheckIcon /> : null}
          onClick={() => setLng(lng.id)}
        >
          <span>{lng.label}</span>
        </DropdownItem>
      );

      res.push(item);
    });
    return res;
  };
  return (
    <DropdownSubMenu
      setActiveMenu={props.setActiveMenu}
      activeMenu={props.activeMenu}
      id="language"
      title={t('components.account.lng')}
    >
      {buildEntries(availableLng)}
    </DropdownSubMenu>
  );
}
export default Language;
