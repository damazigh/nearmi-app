import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ShopAdminList from '../../components/admin/shop.admin';
import CollapsibleWrapper from '../../components/collapsible/collapsible.wrapper';

export default function () {
  const { t } = useTranslation();
  return (
    <div className="m-t-alt2">
      <CollapsibleWrapper summary={t('pages.profile.myShops')}>
        <ShopAdminList />
      </CollapsibleWrapper>
      <CollapsibleWrapper summary={t('pages.profile.myInformation')}>
        <Typography>Pas encore implémenté</Typography>
      </CollapsibleWrapper>
    </div>
  );
}
