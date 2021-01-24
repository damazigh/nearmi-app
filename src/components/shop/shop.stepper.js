import {
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import GeneralStep from './steps/general.step';
import OpenningStep from './steps/openning.step';
import './shop.stepper.css';
import useSnackBars from '../snackbar/use-snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { startedNavigationToNextShopStep } from '../../redux/action/shop.actions';
import AddressStep from './steps/address.step';
import ShopService from '../../service/shop.service';

export default function ShopStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useTranslation();
  const steps = [
    t('pages.createShop.steps.step1'),
    t('pages.createShop.steps.step2'),
    t('pages.createShop.steps.step3'),
  ];
  const { watch, errors, formState, getValues } = useFormContext();
  const [compiledForm, setCompiledForm] = useState({});
  const form = watch();
  const { showSnack } = useSnackBars();
  const dispatch = useDispatch();

  // go to next step
  const handleNext = () => {
    let canContinue = !errors || Object.keys(errors).length === 0;
    switch (activeStep) {
      case 0:
        setCompiledForm({ ...compiledForm, general: form });
        break;
      case 1:
        setCompiledForm({ ...compiledForm, openning: form });
        break;
      case 2:
        handleCreate();
        break;
    }

    if (canContinue) {
      stepHasAlert()
        ? dispatch(startedNavigationToNextShopStep())
        : continueCallback();
    } else {
      showSnack(t('feedback.formWithError'), 'error');
    }
  };

  const handleCreate = () => {
    ShopService.create()
      .then((res) => {
        showSnack(t('feedback.shopCreated'), 'success');
        sessionStorage.removeItem('step_0');
        sessionStorage.removeItem('step_1');
        sessionStorage.removeItem('step_2');
      })
      .catch((err) => showSnack(t('feedback.shopCreationError'), 'error'));
  };

  // go to previous step
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  /**get and display the subcomponent attached to step*/
  const getStepContent = (step, formContent) => {
    switch (step) {
      case 0:
        return (
          <GeneralStep
            {...{ formContent }}
            continueCallback={continueCallback}
          />
        );
      case 1:
        return <OpenningStep />;
      case 2:
        return <AddressStep />;
    }
  };
  const stepHasAlert = () => {
    return activeStep === 0 || activeStep === 2;
  };

  const continueCallback = () => {
    saveValues();
    setActiveStep(activeStep + 1);
  };

  // reset form
  const handleReset = () => {
    setActiveStep(0);
  };

  const saveValues = () => {
    const values = getValues();
    sessionStorage.setItem('step_' + activeStep, JSON.stringify(values));
  };

  return (
    <div>
      <Stepper activeStep={activeStep} className="root no-side-padding">
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {/* contenu de l'étape plus bouton d'actions */}
      <div>
        {activeStep === steps.length ? (
          /** stepper completed */
          <div>
            <Typography className="spacing">{t('.completed')}</Typography>
            <Button onClick={handleReset} className="button-m-r">
              {t('actions.reset')}
            </Button>
          </div>
        ) : (
          /** diplay content*/
          <div>
            <Typography className="spacing">
              {getStepContent(activeStep, compiledForm)}
            </Typography>

            <div className="action action-margin">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className="button-m-r"
              >
                {t('actions.back')}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => handleNext()}
                className="button-m-r"
              >
                {activeStep === steps.length - 1
                  ? t('actions.create')
                  : t('actions.next')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
