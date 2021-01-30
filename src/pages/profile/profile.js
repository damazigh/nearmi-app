import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShopAdminList from '../../components/admin/shop.admin';
import { useTranslation } from 'react-i18next';

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

/**inner component that acts as a collapsible wrapper */
function CollapsibleWrapper(props) {
  return (
    <Accordion className="full-width">
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id={props.id}>
        <Typography variant="h5" component="h4">
          {props.summary}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{props.children}</AccordionDetails>
    </Accordion>
  );
}
