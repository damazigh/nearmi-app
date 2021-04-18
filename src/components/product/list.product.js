import { Avatar, Chip, Fab, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getfetchedProductsSelector } from '../../redux/selector/shop.selector';
import Secured from '../../security/secured.wrapper';
import { ROLE_PROFESSIONAL } from '../../utils/roles.constants';
import { LoadingWrapper } from '../loading/loading';
import ProductCard from './card.product';
import AddIcon from '@material-ui/icons/Add';
import { useHistory, useParams } from 'react-router-dom';
import { AlertDialog } from '../dialog/alert.dialog';
import { format } from '../../utils/utils';
import { useTranslation } from 'react-i18next';
import ProductService from '../../service/product.service';
import { deletedProduct } from '../../redux/action/shop.actions';
import useSnackBars from '../snackbar/use-snackbar';
import Logger from 'js-logger';

export default function ListProduct({ detail }) {
  const [isLoading, setIsLoading] = useState(false);
  const loadedProduct = useSelector(getfetchedProductsSelector);
  const history = useHistory();
  const { id } = useParams();
  const [idToDelete, setIdToDelete] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { showSnack } = useSnackBars();

  const extractName = () => {
    if (loadedProduct && loadedProduct.products && idToDelete) {
      const p = loadedProduct.products.find((p) => p.id === idToDelete);
      if (p) {
        console.log(p);
        return p.name;
      }
    }
  };
  const handleDelete = () => {
    dispatch((thunk_dispatch) => {
      setIsLoading(true);
      ProductService.deleteProduct(id, idToDelete)
        .then((res) => {
          thunk_dispatch(deletedProduct(idToDelete));
          showSnack(t('feedback.operationSucceded'));
        })
        .catch((err) => {
          showSnack(t('feedback.operationError'));
          Logger.error('error occured while deleting product ' + err);
        })
        .finally(() => setIsLoading(false));
    });
  };
  const handleEmptyCategory = (category) => {
    if (
      loadedProduct &&
      loadedProduct.products &&
      loadedProduct.products.length > 0 &&
      !loadedProduct.products.some(
        (p) => p.productCategory && p.productCategory.id === category.id
      )
    ) {
      return (
        <div className="full-width flex jc-center">
          <Alert severity="warning">
            Aucun produit attaché à cette catégorie
          </Alert>
        </div>
      );
    }
  };
  return (
    <LoadingWrapper loading={isLoading}>
      <Grid container xs={12} md={12} sm={12} className="full-width container">
        {detail &&
          detail.productCategories &&
          detail.productCategories.map((pc) => (
            <Grid className="full-width" container spacing={2}>
              <Grid item xs={12} md={12} sm={12}>
                <a id={pc.name} />
                <h1 className="h1">{pc.name}</h1>
              </Grid>
              {loadedProduct &&
                loadedProduct.products &&
                loadedProduct.products
                  .filter(
                    (p) => p.productCategory && p.productCategory.id === pc.id
                  )
                  .map((p) => (
                    <ProductCard
                      product={p}
                      setProductIdToDelete={setIdToDelete}
                    />
                  ))}

              {handleEmptyCategory(pc)}
            </Grid>
          ))}

        {loadedProduct &&
        loadedProduct.products &&
        loadedProduct.products.some((p) => !p.productCategory) ? (
          <Grid container className="full-width" spacing={2}>
            <Grid item xs={12} md={12} sm={12}>
              <a id="otherProducts" />
              <h1 className="h1">
                Autres produits
                <Secured requiredRoles={[ROLE_PROFESSIONAL]}>
                  &nbsp;(non affecté à une catégorie)
                </Secured>
              </h1>
            </Grid>
            {loadedProduct.products.map((p) => (
              <ProductCard product={p} setProductIdToDelete={setIdToDelete} />
            ))}
          </Grid>
        ) : null}
      </Grid>
      <Secured requiredRoles={[ROLE_PROFESSIONAL]}>
        <div className="m-t-alt1 full-width flex jc-f-end">
          <Grid item>
            <Fab
              color="primary"
              aria-label="add"
              className="flex"
              onClick={() => history.push(`/shop/${id}/add-product`)}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </div>
      </Secured>
      <AlertDialog
        isOpen={
          !!idToDelete &&
          loadedProduct.products.some((p) => p.id === idToDelete)
        }
        onClose={() => setIdToDelete(null)}
        textContent={format(t('feedback.productDeletionWarning'), [
          extractName(),
        ])}
        onContinue={handleDelete}
      />
    </LoadingWrapper>
  );
}
