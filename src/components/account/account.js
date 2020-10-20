import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DropdownMenu, { DropdownMenuMain } from '../dropdown/dropdown.menu';
import TranslateIcon from '@material-ui/icons/Translate';
import Language from './language';
import DropdownItem from '../dropdown/dropdown-item/dropdown.item';

function Account() {
    const [height, setMenuHeight] = useState(null);
    const [activeMenu, setActiveMenu] = useState('main');
    const { t } = useTranslation();
    
    return (
        <DropdownMenu setMenuHeight={setMenuHeight} height={height}>
            <DropdownMenuMain activeMenu={activeMenu} setMenuHeight={setMenuHeight}>
                <DropdownItem setActiveMenu={setActiveMenu} leftIcon={<TranslateIcon/>} goToMenu="language">
                    {t('components.account.lng')}
                </DropdownItem>
            </DropdownMenuMain>
            <Language setActiveMenu={setActiveMenu} activeMenu={activeMenu}/>
        </DropdownMenu>
    );
}

export default Account;