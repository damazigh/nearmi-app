import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ShopStepper from '../../components/shop/shop.stepper';

export default function CreateShop() {
  const methods = useForm({ mode: 'onBlur' });
  const { watch, errors } = methods;

  return (
    <FormProvider {...methods}>
      <ShopStepper />
    </FormProvider>
  );
}
