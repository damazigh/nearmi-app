import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ShopStepper from '../../components/shop/shop.stepper';

export default function CreateShop() {
  const methods = useForm({ mode: 'all' });

  return (
    <FormProvider {...methods}>
      <ShopStepper />
    </FormProvider>
  );
}
