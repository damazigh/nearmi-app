import { Button, Grid, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { format } from '../../../utils/utils';
import './step.css';
import { DevTool } from '@hookform/devtools';
import TextFieldControl from '../../control/text-field.ctrl';
import { useState } from 'react';
import {
  numericWithoutSpace,
  luhn,
  lengthWithoutSpace,
} from '../../../utils/validator';
import { Upload } from '../../upload/upload';

export default function GeneralStep({ formContent }) {
  const methods = useFormContext();
  const { reset } = methods;
  const [regNumVal, setRegNumVal] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    reset({ ...formContent.general }, { errors: true });
  }, []);

  const insertSpaceAt = (val, at) => {
    if (val && val.length >= at + 1 && val.charAt(at + 1) !== ' ') {
      val = val.substring(0, at) + ' ' + val.substring(at, val.length);
      return val;
    }
    return val;
  };

  const formatRegistration = (e) => {
    let newVal = e.target.value;
    if (e.target.value) {
      newVal = insertSpaceAt(newVal, 3);
      newVal = insertSpaceAt(newVal, 7);
      newVal = insertSpaceAt(newVal, 11);
      e.target.value = newVal;
      console.info(newVal);
    }
    setRegNumVal(newVal);
  };

  return (
    <form noValidate>
      <Paper elevation={5} className="paper-spacing paper-width">
        <Grid container spacing={4} className="center-xs">
          <Grid item md={6} sm={6} xs={11}>
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
          <Grid item md={6} sm={6} xs={11}>
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
          <Grid item md={10} sm={10} xs={11}>
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
          <Grid item md={6} sm={6} xs={11}>
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
              value={regNumVal}
              onChange={(e) => formatRegistration(e)}
              rules={{
                required: true,
                validate: {
                  numeric: (val) => numericWithoutSpace(val),
                  length: (val) => lengthWithoutSpace(val, 14),
                  luhn: (val) => luhn(val),
                },
              }}
              messages={{
                required: t('validation.commons.required'),
                numeric: t('validation.commons.numeric'),
                length: format(t('validation.commons.length'), [14]),
                luhn: t('validation.createShop.invalidRegNum'),
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item md={12} sm={12} xs={11} className="upload">
            <Upload
              buttonTitle={t(
                'pages.createShop.components.generalStep.rootImage'
              )}
            />
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}
