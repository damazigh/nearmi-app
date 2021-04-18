import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
} from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Secured from '../../security/secured.wrapper';
import { ROLE_PROFESSIONAL } from '../../utils/roles.constants';

export default function ProductCard({ product, setProductIdToDelete }) {
  const { t } = useTranslation();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card elevation={2}>
        <CardContent>
          <div>
            <strong>{product.name.toUpperCase()}</strong>
          </div>
          <div>{product.description}</div>
        </CardContent>
        <CardActions className="flex dir-row-reverse">
          <Secured requiredRoles={[ROLE_PROFESSIONAL]}>
            <Button size="small" color="primary">
              {t('actions.view')}
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => setProductIdToDelete(product.id)}
            >
              {t('actions.delete')}
            </Button>
          </Secured>
        </CardActions>
      </Card>
    </Grid>
  );
}
