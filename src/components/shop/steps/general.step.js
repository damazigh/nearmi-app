import { Button, Grid, Paper, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { format, renderErrorIfExists } from '../../../utils/utils';
import './step.css';
import { DevTool } from '@hookform/devtools';
import TextFieldControl from '../../control/text-field.ctrl';
import { useState } from 'react';

export default function GeneralStep({ formContent }) {
  const methods = useFormContext();
  const { reset, control } = methods;
  const [regNumVal, setRegNumVal] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    reset({ ...formContent.general }, { errors: true });
  }, []);

  const formatRegistration = (e) => {
    e.target.value = '';
  };
  return (
    <form noValidate>
      <DevTool control={control} />
      <Paper elevation={5} className="paper-spacing paper-width">
        <Grid container spacing={5}>
          <Grid item md={6} xs={10}>
            <TextFieldControl
              name="shopName"
              required
              className="full-width"
              label={t('pages.createShop.components.generalStep.shopName')}
              placeholder={t(
                'pages.createShop.components.generalStep.shopNamePlaceholder'
              )}
              rules={{ required: true, minLength: 2 }}
              messages={{
                required: t('validation.commons.required'),
                minLength: format(t('validation.commons.minLength'), [2]),
              }}
            />
          </Grid>
          <Grid item md={6} xs={10}>
            <TextFieldControl
              name="shopshorDesc"
              required
              className="full-width"
              label={t('pages.createShop.components.generalStep.shortDesc')}
              placeholder={t(
                'pages.createShop.components.generalStep.shortDescPlaceholder'
              )}
              rules={{ required: true }}
              messages={{
                required: t('validation.commons.required'),
              }}
            />
          </Grid>
          <Grid item md={10} xs={10}>
            <TextFieldControl
              name="shopLongDesc"
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
              onChange={(e) => formatRegistration(e)}
            />
            <TextFieldControl
              name="shopRegNum"
              required
              className="full-width"
              label={t(
                'pages.createShop.components.generalStep.registrationNumber'
              )}
              placeholder={t(
                'pages.createShop.components.generalStep.registrationNumberPlaceholder'
              )}
              onChange={(e) => formatRegistration(e)}
              rules={{ required: true, length: 14, pattern: '^\\d+' }}
              messages={{
                required: t('validation.commons.required'),
                length: format(t('validation.commons.length'), [14]),
                pattern: t('validation.commons.numeric'),
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={5}>
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
