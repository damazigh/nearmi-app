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
import {
  startedNavigationToNextShopStep,
  stepHasWarn,
} from '../../redux/action/shop.actions';
import { shopCreactionIgnoreWarnSelector } from '../../redux/selector/shop.selector';

export default function ShopStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useTranslation();
  const steps = [
    t('pages.createShop.steps.step1'),
    t('pages.createShop.steps.step2'),
    t('pages.createShop.steps.step3'),
  ];
  const { watch, errors, formState } = useFormContext();
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
    }

    if (canContinue) {
      dispatch(startedNavigationToNextShopStep());
    } else {
      showSnack(t('feedback.formWithError'), 'error');
    }
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
        return <OpenningStep {...{ formContent }} />;
      case 2:
        return "je suis l'étape 3";
    }
  };

  const continueCallback = () => {
    setActiveStep(activeStep + 1);
  };

  // reset form
  const handleReset = () => {
    setActiveStep(0);
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
                disabled={!formState.isValid}
              >
                {activeStep === steps.length - 1
                  ? t('actions.save')
                  : t('actions.next')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
