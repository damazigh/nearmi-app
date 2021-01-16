import { Grid, Grow, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { format } from '../../../utils/utils';
import './step.css';
import TextFieldControl from '../../control/text-field.ctrl';
import { useState } from 'react';
import {
  numericWithoutSpace,
  luhn,
  lengthWithoutSpace,
} from '../../../utils/validator';
import { Upload } from '../../upload/upload';
import { AlertDialog } from '../../dialog/alert.dialog';
import { useDispatch, useSelector } from 'react-redux';
import {
  shopCreationNextStepSelector,
  shopCreationRestoreValues,
} from '../../../redux/selector/shop.selector';
import { handledNextStep } from '../../../redux/action/shop.actions';

export default function GeneralStep(props) {
  const methods = useFormContext();
  const { reset, setValue } = methods;
  const [regNumVal, setRegNumVal] = useState('');
  const { t } = useTranslation();
  const nextStep = useSelector(shopCreationNextStepSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const valuesAsString = sessionStorage.getItem('step_0');
    if (valuesAsString) {
      const values = JSON.parse(valuesAsString);
      Object.keys(values).forEach((key) => {
        const val = values[key];
        if (val) {
          setValue(key, val, { shouldValidate: true });
        }
      });
    }
  }, []);

  const insertSpaceAt = (val, at) => {
    if (
      val &&
      (val.length === at || (val.charAt(at) !== ' ' && val.length > at))
    ) {
      val = val.substring(0, at) + ' ' + val.substring(at, val.length);
      return val;
    }
    return val;
  };
  const formatRegistration = (e) => {
    let newVal = e.target.value;
    const isDelete = regNumVal.length > newVal.length;
    if (e.target.value && !isDelete) {
      newVal = insertSpaceAt(newVal, 3);
      newVal = insertSpaceAt(newVal, 7);
      newVal = insertSpaceAt(newVal, 11);
      e.target.value = newVal;
    }
    setRegNumVal(newVal);
  };

  const shouldDisplayAlert = (id) => {
    const elt = document.getElementById(`#${id}`);
    if (!elt || !elt.value) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * handle ignore warn (alert) when user hits
   * continue button
   */
  const onContinue = () => {
    props.continueCallback();
    dispatch(handledNextStep());
  };

  const onCancel = () => {
    dispatch(handledNextStep());
    console.info('yolo !!!');
    console.info(nextStep);
  };

  return (
    <div>
      <Grow mountOnEnter in={true} unmountOnExit>
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
            <Grid container spacing={4} className="center-xs">
              <Grid item md={6} sm={6} xs={11}>
                <Upload name="image" label="image" id="mainShopImage" />
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Grow>
      <AlertDialog
        id="shopImage"
        isOpen={nextStep && shouldDisplayAlert('shopImage')}
        onContinue={onContinue}
        onCancel={onCancel}
        textContentKey="feedback.shopWithoutImage"
      />
    </div>
  );
}
