import { Button, Grid } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Logger from 'js-logger';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import Secured from '../../security/secured.wrapper';
import ProductCategoryService from '../../service/product-category.service';
import ProductService from '../../service/product.service';
import UnicityService from '../../service/unicity.service';
import { ROLE_PROFESSIONAL } from '../../utils/roles.constants';
import { focusElt, format } from '../../utils/utils';
import { asyncValidator, numeric, numericOrEmpty } from '../../utils/validator';
import { ControlledCollapsibleWrapper } from '../collapsible/collapsible.wrapper';
import TextFieldControl from '../control/text-field.ctrl';
import { AlertDialog } from '../dialog/alert.dialog';
import GalleryAndUploader from '../gallery-uploader/gallery-uploader';
import { LoadingWrapper } from '../loading/loading';
import useSnackBars from '../snackbar/use-snackbar';

const PRODUCT_DETAIL_PANEL = 'productDetailPanel';
const PRODUCT_GALLERY_PANEL = 'productGalleryPanel';

export default function CreateUpdateProduct({ product }) {
  // loading state
  const [isLoading, setIsLoading] = useState(true);
  // react hook form
  const methods = useForm({ mode: 'all' });
  // i18n hook
  const { t } = useTranslation();
  // expanded accordions panel
  const [expanded, setExpanded] = useState(PRODUCT_DETAIL_PANEL);
  // hold product categories in state
  const [productCategories, setProductCategories] = useState();
  // shop id
  const { id } = useParams();
  // leave without saving alert state
  const [isLeaveAlertOpen, setIsLeaveAlertOpen] = useState(false);
  // history hook for redirecting
  const history = useHistory();
  // getvalues
  const { getValues, formState, setValue } = methods;
  // snackbar hook
  const { showSnack } = useSnackBars();

  useEffect(() => {
    if (!productCategories) {
      focusElt('productName');
      ProductCategoryService.listProductCategory(id).then((res) => {
        setProductCategories(res.data);
        setIsLoading(false);
      }, []);
    }
  }, [productCategories, isLoading]);

  /**
   * function that updates the component state by setting the expanded accordion to
   * the value of panek
   * @param {string} panel
   */
  const handleChange = (panel) => (event, isExpanded) => {
    Logger.debug(
      '[add-product] - switched from panel ' + expanded + ' to panel ' + panel
    );
    setExpanded(isExpanded ? panel : false);
  };

  /**
   * method for handling next or save event
   */
  const handleNextOrSave = () => {
    if (!expanded) {
      setExpanded(PRODUCT_DETAIL_PANEL);
    } else {
      switch (expanded) {
        case PRODUCT_DETAIL_PANEL:
          setExpanded(PRODUCT_GALLERY_PANEL);
          break;
        case PRODUCT_GALLERY_PANEL:
          Logger.debug('[add-product] - submitting product');
          handleSave();
          break;
      }
    }
  };

  const handleBack = () => {
    switch (expanded) {
      case PRODUCT_GALLERY_PANEL:
        setExpanded(PRODUCT_DETAIL_PANEL);
        break;
    }
  };

  const handleSave = () => {
    setIsLoading(true);
    if (formState.isValid && formState.touched) {
      const values = getValues();
      const product = {};
      product.name = values.productName;
      product.description = values.productDescription;
      product.price = Number.parseFloat(values.productPrice);
      if (values.productQuantity) {
        product.quantity = Number.parseInt(values.productQuantity);
      } else {
        product.quantity = null;
      }
      const metadata = JSON.parse(sessionStorage.productGalleryMetadata);
      if (values.productCategory) {
        const category = productCategories.find(
          (x) => x.name === values.productCategory
        );
        if (category) {
          product.productCategory = category.id;
        }
      }
      ProductService.createProduct(id, product, metadata)
        .then((res) => {
          history.push(`/shop/${id}`);
          showSnack(t('feedback.operationSucceded'), 'success');
        })
        .catch((err) => {
          Logger.error(
            'error while submitting new product ' + JSON.stringify(err)
          );
          showSnack(t('feedback.operationFailded'));
        })
        .finally(() => setIsLoading(false));
    }
  };
  return (
    <Secured requiredRoles={[ROLE_PROFESSIONAL]}>
      <LoadingWrapper loading={isLoading}>
        <FormProvider {...methods}>
          <form
            className="full-width m-t-alt1"
            onSubmit={(e) => e.preventDefault()}
          >
            <ControlledCollapsibleWrapper
              id="product_general"
              summary={t('components.createProduct.generalSummary')}
              onChange={() => handleChange(PRODUCT_DETAIL_PANEL)}
              expanded={expanded === PRODUCT_DETAIL_PANEL}
            >
              <Grid container spacing={4}>
                {/**product name field */}
                <Grid item xs={12} md={4}>
                  <TextFieldControl
                    name="productName"
                    id="productName"
                    className="full-width"
                    required
                    rules={{
                      required: true,
                      minLength: 3,
                      validate: {
                        unicity: async (val) =>
                          asyncValidator(() =>
                            UnicityService.productUnicity('name', val, id)
                          ),
                      },
                    }}
                    messages={{
                      required: t('validation.commons.required'),
                      minLength: format(t('validation.commons.minLength'), [
                        '3',
                      ]),
                      unicity: t('validation.commons.unicity'),
                    }}
                    label={t(
                      'components.createProduct.fields.productName.label'
                    )}
                    placeholder={t(
                      'components.createProduct.fields.productName.placeholder'
                    )}
                  />
                </Grid>
                {/**product description field */}
                <Grid item xs={12} md={8}>
                  <TextFieldControl
                    name="productDescription"
                    id="productDescription"
                    className="full-width"
                    label={t(
                      'components.createProduct.fields.productDescription.label'
                    )}
                    placeholder={t(
                      'components.createProduct.fields.productDescription.placeholder'
                    )}
                    multiline
                  />
                </Grid>
                {/**product price field */}
                <Grid item xs={12} md={6} sm={6}>
                  <TextFieldControl
                    name="productPrice"
                    id="productPrice"
                    className="full-width"
                    label={t(
                      'components.createProduct.fields.productPrice.label'
                    )}
                    placeholder={t(
                      'components.createProduct.fields.productPrice.placeholder'
                    )}
                    required
                    rules={{
                      required: true,
                      validate: {
                        numeric: (val) => numeric(val),
                      },
                    }}
                    messages={{
                      required: t('validation.commons.required'),
                      numeric: t('validation.commons.numeric'),
                    }}
                  />
                </Grid>
                {/**product quantity field */}
                <Grid item xs={12} md={6} sm={6}>
                  <TextFieldControl
                    name="productQuantity"
                    id="productQuantity"
                    className="full-width"
                    label={t(
                      'components.createProduct.fields.productQuantity.label'
                    )}
                    placeholder={t(
                      'components.createProduct.fields.productQuantity.placeholder'
                    )}
                    rules={{
                      validate: {
                        numericOrEmpty: (val) => numericOrEmpty(val),
                      },
                    }}
                    messages={{
                      required: t('validation.commons.required'),
                      numericOrEmpty: t('validation.commons.numericOrEmpty'),
                    }}
                  />
                </Grid>
                {/**product category field */}
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={productCategories}
                    getOptionLabel={(option) => option.name}
                    className="full-width"
                    onInputChange={(e, val) => {
                      setValue('productCategory', val);
                    }}
                    renderInput={(params) => (
                      <TextFieldControl
                        {...params}
                        name="productCategory"
                        id="productCategory"
                        label={t(
                          'components.createProduct.fields.productCategory.label'
                        )}
                        placeholder={t(
                          'components.createProduct.fields.productCategory.placeholder'
                        )}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </ControlledCollapsibleWrapper>
            <ControlledCollapsibleWrapper
              id="product_gallery"
              summary={t('components.createProduct.productGallery')}
              onChange={() => handleChange(PRODUCT_GALLERY_PANEL)}
              expanded={expanded === PRODUCT_GALLERY_PANEL}
            >
              <GalleryAndUploader inMemory={true} trackMetadata={true} />
            </ControlledCollapsibleWrapper>

            <Grid container className="flex dir-row-reverse">
              <div className="m-t-alt2">
                <Button
                  variant="contained"
                  className="button-m-r"
                  onClick={() => setIsLeaveAlertOpen(true)}
                >
                  {t('actions.cancel')}
                </Button>

                {expanded !== PRODUCT_DETAIL_PANEL && expanded && (
                  <Button
                    className="button-m-r"
                    variant="contained"
                    onClick={handleBack}
                  >
                    {t('actions.back')}
                  </Button>
                )}
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleNextOrSave}
                  disabled={!formState.isValid || !formState.touched}
                >
                  {expanded === PRODUCT_DETAIL_PANEL
                    ? t('actions.next')
                    : t('actions.save')}
                </Button>
              </div>
            </Grid>
          </form>
        </FormProvider>
      </LoadingWrapper>
      {/** leave alert dialog */}
      <AlertDialog
        isOpen={isLeaveAlertOpen}
        onContinue={() => history.push(`/shop/${id}`)}
        onClose={() => {
          setIsLeaveAlertOpen(false);
        }}
        textContent={t('feedback.leaveWithoutSave')}
      />
    </Secured>
  );
}
