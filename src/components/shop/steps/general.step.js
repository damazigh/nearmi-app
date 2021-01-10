import { Button, Grid, Paper, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import './step.css';

export default function GeneralStep({ formContent }) {
  const methods = useFormContext();
  const { reset, registe } = methods;
  const { t } = useTranslation();

  useEffect(() => {
    reset({ ...formContent.general }, { errors: true });
  }, []);

  return (
    <form noValidate>
      <Paper elevation={5} className="paper-spacing paper-width">
        <Grid container spacing={5} md={12} xs={12}>
          <Grid item md={6} xs={10}>
            <TextField
              required
              className="full-width"
              label={t('pages.createShop.components.generalStep.shopName')}
              placeholder={t(
                'pages.createShop.components.generalStep.shopNamePlaceholder'
              )}
            />
          </Grid>
          <Grid item md={6} xs={10}>
            <TextField
              className="full-width"
              required
              label={t('pages.createShop.components.generalStep.shortDesc')}
              placeholder={t(
                'pages.createShop.components.generalStep.shortDescPlaceholder'
              )}
            />
          </Grid>
          <Grid item md={10} xs={10}>
            <TextField
              className="full-width"
              label={t('pages.createShop.components.generalStep.longDesc')}
              placeholder={t(
                'pages.createShop.components.generalStep.longDescPlaceholder'
              )}
              multiline
            />
          </Grid>
          <Grid item md={6} xs={10}>
            <TextField
              className="full-width"
              required
              label={t(
                'pages.createShop.components.generalStep.registrationNumber'
              )}
              placeholder={t(
                'pages.createShop.components.generalStep.registrationNumberPlaceholder'
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={5} md={12} xs={12}>
          <Grid item md={3} xs={6}>
            <p>{t('pages.createShop.components.generalStep.rootImage')}</p>
          </Grid>
          <Grid item md={3} xs={4} className="upload">
            <Button variant="contained" component="label">
              {t('pages.createShop.actions.upload')}
              <input type="file" hidden />
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}
