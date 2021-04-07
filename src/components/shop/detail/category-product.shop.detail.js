import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Grid,
  Button,
  Fab,
  ButtonBase,
  InputAdornment,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Secured from '../../../security/secured.wrapper';
import { ROLE_PROFESSIONAL } from '../../../utils/roles.constants';
import { LoadingWrapper } from '../../loading/loading';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import '../../../utils/table.responsive.css';
import { Alert } from '@material-ui/lab';
import ContentDialog from '../../dialog/content.dialog';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import TextFieldControl from '../../control/text-field.ctrl';
import AddIcon from '@material-ui/icons/Add';
import Logger from 'js-logger';
import { DevTool } from '@hookform/devtools';
import { useParams } from 'react-router-dom';
import ProductCategoryService from '../../../service/product-category.service';
import ShopService from '../../../service/shop.service';
import { updateVistedShop } from '../../../redux/action/shop.actions';
import useSnackBars from '../../snackbar/use-snackbar';
import { Shop } from '@material-ui/icons';
import { AlertDialog } from '../../dialog/alert.dialog';
import { format } from '../../../utils/utils';

export default function ShopCategoryProduct({ detail }) {
  // loading state
  const [isLoading, setIsLoading] = useState(false);
  // i18n for internationalization
  const { t } = useTranslation();
  // open add category dialog state
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  // snackbar
  const { showSnack } = useSnackBars();
  // shop id
  const { id } = useParams();
  // dispatch
  const dispatch = useDispatch();
  // deletion confirmation dialog open state
  const [isDeletionDialogOpen, setIsDeletionDialogOpen] = useState(false);

  /**
   * mark a category for deletion
   * @param {*} id
   */
  const markForDeletion = (id, name) => {
    sessionStorage.setItem('pcIdToDelete', id);
    sessionStorage.setItem('pcNameToDelete', name);
    setIsDeletionDialogOpen(true);
  };
  /**
   * delete product category by id
   * @param {*} catId
   */
  const handleDeleteProductCategory = () => {
    const catId = sessionStorage.pcIdToDelete;
    setIsLoading(true);
    ProductCategoryService.deleteProductCategory(id, catId)
      .then(() => {
        ShopService.proShopDetail(id)
          .then((res) => {
            dispatch(updateVistedShop(res.data));
            showSnack(t('feedback.operationSucceeded'));
          })
          .catch((err) => showSnack(t('feedback.fetchDataInternalError')));
      })
      .catch((err) => {
        Logger.error(err);
        showSnack(t('feedback.operationError'));
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Secured requiredRoles={[ROLE_PROFESSIONAL]}>
      <Grid container className="m-t-alt1">
        <LoadingWrapper loading={isLoading}>
          <TableContainer component="div" className="full-width">
            <Table aria-label="product category list">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    {t('components.productCategoryList.label')}
                  </TableCell>
                  <TableCell align="left">
                    {t('components.productCategoryList.created')}
                  </TableCell>
                  <TableCell align="left">{t('actions.delete')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detail &&
                  detail.productCategories &&
                  detail.productCategories.map((pc, i) => (
                    <TableRow key={i}>
                      <TableCell
                        data-label={t('components.productCategoryList.label')}
                      >
                        {pc.name}
                      </TableCell>
                      <TableCell
                        data-label={t('components.productCategoryList.label')}
                      >
                        {pc.order}
                      </TableCell>
                      <TableCell data-label={t('actions.delete')}>
                        <ButtonBase
                          onClick={() => markForDeletion(pc.id, pc.name)}
                        >
                          <DeleteForeverIcon
                            color="primary"
                            fontSize="small"
                            className="pointer icon-effect"
                          />
                        </ButtonBase>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {!detail ||
              (!detail.productCategories && (
                <div className="jc-center flex">
                  <Grid item xs={12} sm={6} md={4}>
                    <Alert severity="warning" className="jc-center m-t-alt1">
                      {t('feedback.noItemToDisplay')}
                    </Alert>
                  </Grid>
                </div>
              ))}
          </TableContainer>

          <div className="m-t-alt1 full-width flex jc-f-end">
            <Grid item>
              <Fab
                color="primary"
                aria-label="add"
                className="flex"
                onClick={(e) => setIsAddCategoryOpen(true)}
              >
                <AddIcon />
              </Fab>
            </Grid>
          </div>
        </LoadingWrapper>
      </Grid>
      <Grid item xs={12} md={12}>
        <AddProductCategory
          open={isAddCategoryOpen}
          onClose={() => setIsAddCategoryOpen(false)}
          setIsLoading={setIsLoading}
        />
      </Grid>

      <Grid item>
        <AlertDialog
          isOpen={isDeletionDialogOpen}
          onClose={() => {
            delete sessionStorage.pcIdToDelete;
            delete sessionStorage.pcNameToDelete;
            setIsDeletionDialogOpen(false);
          }}
          textContent={format(t('feedback.productCategoryDeletionWarning'), [
            sessionStorage.pcNameToDelete,
          ])}
          onContinue={handleDeleteProductCategory}
        />
      </Grid>
    </Secured>
  );
}

function AddProductCategory({ open, onClose, setIsLoading }) {
  const methods = useForm({ mode: 'all' });
  const { t } = useTranslation();
  const [controls, setControls] = useState([{ key: 0, value: '' }]);
  const { formState, control, setValue, unregister, getValues } = methods;
  const { id } = useParams();
  const dispatch = useDispatch();
  const { showSnack } = useSnackBars();

  useEffect(() => {
    return () => {
      controls.forEach((c) => unregister(`productCategoryName_${c.key}`));
      setControls([{ key: 0, value: '' }]);
    };
  }, []);

  const add = () => {
    const numbers = controls.map((c) => c.key);
    const newKey = Math.max(...numbers) + 1;
    Logger.debug('adding item with generated key ' + newKey);
    const toAdd = { key: newKey, value: '' };
    setControls((old) => [...old, toAdd]);
    setValue(`productCategoryName_${newKey}`, '');
  };

  const deleteItem = (item) => {
    Logger.debug('delete item with key ' + item.key);
    setControls((old) => old.filter((val) => val.key !== item.key));
  };

  const updateVal = (e, input) => {
    setValue(input, e.target.value, { shouldValidate: true });
  };

  const proceed = () => {
    onClose();
    setIsLoading(true);
    const values = getValues();
    const categories = [];
    Object.keys(values).forEach((k) => {
      categories.push({ name: values[k] });
    });

    ProductCategoryService.createProductCategories(id, categories)
      .then((res) => {
        ShopService.proShopDetail(id)
          .then((res) => {
            dispatch(updateVistedShop(res.data));
            showSnack(t('feedback.operationSucceded'));
          })
          .catch((err) => {
            Logger.error('an error occured while fetching data from server');
            showSnack(t('feedback.operationError'));
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((err) => {
        Logger.error('error ' + err);
        setIsLoading(false);
        showSnack(t('feedback.operationError'));
      });
  };

  return (
    <>
      <DevTool control={control} />
      <ContentDialog
        isOpen={open}
        proceed={() => proceed()}
        onClose={onClose}
        fullWidth={true}
        disableMainAction={() => !formState.isValid || !formState.touched}
      >
        <Grid container xs={12} md={12}>
          <FormProvider {...methods}>
            <form className="full-width" onSubmit={(e) => e.preventDefault()}>
              {controls.map((ctrl, i) => (
                <Grid container className="flex">
                  <Grid item={true} xs={12} md={12} sm={12}>
                    <TextFieldControl
                      className="full-width m-t-alt2"
                      name={`productCategoryName_${ctrl.key}`}
                      rules={{ required: true }}
                      messages={{
                        required: t('validation.commons.required'),
                      }}
                      key={ctrl.key}
                      placeholder={`${t(
                        'components.productCategoryList.addCategorie.placeholder'
                      )} ${i + 1}`}
                      label={t(
                        'components.productCategoryList.addCategorie.title'
                      )}
                      InputProps={{
                        endAdornment:
                          controls.length > 1 ? (
                            <InputAdornment position="start">
                              <ButtonBase
                                onClick={() => deleteItem(controls[i])}
                              >
                                <DeleteForeverIcon color="primary" />
                              </ButtonBase>
                            </InputAdornment>
                          ) : null,
                      }}
                      onChange={(e) =>
                        updateVal(e, `productCategoryName_${ctrl.key}`)
                      }
                    />
                  </Grid>
                </Grid>
              ))}
            </form>
          </FormProvider>
        </Grid>
        <Grid item className="flex dir-row-reverse">
          <div className="m-t-alt1">
            <Button variant="outlined" color="secondary" onClick={() => add()}>
              {t('Add another')}
            </Button>
          </div>
        </Grid>
      </ContentDialog>
    </>
  );
}
