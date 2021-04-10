import { Button, Grid } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Logger from 'js-logger';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import Secured from '../../security/secured.wrapper';
import ProductCategoryService from '../../service/product-category.service';
import UnicityService from '../../service/unicity.service';
import { ROLE_PROFESSIONAL } from '../../utils/roles.constants';
import { format } from '../../utils/utils';
import { asyncValidator, numeric, numericOrEmpty } from '../../utils/validator';
import { ControlledCollapsibleWrapper } from '../collapsible/collapsible.wrapper';
import TextFieldControl from '../control/text-field.ctrl';
import { AlertDialog } from '../dialog/alert.dialog';
import { LoadingWrapper } from '../loading/loading';
import { focusElt } from '../../utils/utils';

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
                        unicity: (val) =>
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
                        required
                        rules={{
                          required: true,
                        }}
                        messages={{
                          required: t('validation.commons.required'),
                        }}
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
              <p>pas encore implémenté</p>
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

                {expanded !== PRODUCT_DETAIL_PANEL && (
                  <Button className="button-m-r" variant="contained">
                    {t('actions.back')}
                  </Button>
                )}
                <Button color="primary" variant="contained">
                  {expanded === PRODUCT_DETAIL_PANEL
                    ? t('actions.next')
                    : t('actions.save')}
                </Button>
              </div>
            </Grid>
          </form>
        </FormProvider>
      </LoadingWrapper>
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
