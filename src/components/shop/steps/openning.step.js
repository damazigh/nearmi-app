import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Grow,
  Paper,
  Switch,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useTranslation } from 'react-i18next';
import TimeControl from '../../control/time.ctrl';
import './step.css';

export default function OpenningStep(formContent) {
  const methods = useFormContext();
  const { reset, register, control } = methods;
  const { t } = useTranslation();
  const [lunchClosure, setLunchClosure] = useState(true);
  const [schedulingAppointment, setSchedulingAppointment] = useState(false);

  useEffect(() => {
    reset({ ...formContent.openning }, { errors: true });
  }, []);

  const displayClosureTime = () => {
    if (!lunchClosure) {
      return (
        <Grid container spacing={4}>
          <Grid item md={4} sm={6} xs={6}>
            <TimeControl
              name="lunchClosesAt"
              label={t('pages.createShop.components.openningStep.lunchClosure')}
              className="full-width"
              defaultValue="13:00"
              rules={{ required: true }}
              messages={{ required: t('validation.commons.required') }}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={6}>
            <TimeControl
              name="lunchReopensAt"
              label={t('pages.createShop.components.openningStep.lunchReopen')}
              className="full-width"
              defaultValue="14:00"
              rules={{ required: true }}
              messages={{ required: t('validation.commons.required') }}
            />
          </Grid>
        </Grid>
      );
    }
    return <></>;
  };
  return (
    <Grow in={true} mountOnEnter unmountOnExit>
      <form novalidate>
        <Paper elevation={5} className="paper-spacing paper-width">
          <Grid container spacing={4}>
            <Grid item md={4} sm={6} xs={6}>
              <TimeControl
                name="opensAt"
                label={t('pages.createShop.components.openningStep.opensAt')}
                className="full-width"
                defaultValue="09:00"
                rules={{ required: true }}
                messages={{ required: t('validation.commons.required') }}
              />
            </Grid>
            <Grid item md={4} sm={6} xs={6}>
              <TimeControl
                name="closesAt"
                label={t('pages.createShop.components.openningStep.closesAt')}
                className="full-width"
                defaultValue="18:00"
                rules={{ required: true }}
                messages={{ required: t('validation.commons.required') }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item md={4} sm={6} xs={8}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  {t(
                    'pages.createShop.components.openningStep.askLunchClosure'
                  )}
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch inputRef={register} name="lunchClosure" />}
                    onChange={() => setLunchClosure(!lunchClosure)}
                    checked={lunchClosure}
                    label={
                      lunchClosure
                        ? t(
                            'pages.createShop.components.openningStep.openedAtLunch'
                          )
                        : t(
                            'pages.createShop.components.openningStep.closedAtLunch'
                          )
                    }
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
          {displayClosureTime()}
          <Grid container spacing={4}>
            <Grid item md={12} sm={12} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  {t('pages.createShop.components.openningStep.otherSettings')}
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch name="schedulingAppointement" />}
                    onChange={() =>
                      setSchedulingAppointment(!schedulingAppointment)
                    }
                    checked={schedulingAppointment}
                    label={
                      schedulingAppointment
                        ? t(
                            'pages.createShop.components.openningStep.schedulingAppointment'
                          )
                        : t(
                            'pages.createShop.components.openningStep.notSchedulingAppointment'
                          )
                    }
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </Grow>
  );
}
